'use client';
import React, { useState, useEffect } from "react";
import { pangramToSentence } from '@/app/utils/pangramToSentence';
import { LettersAnimation } from "./LettersAnimation";
export default function Page() {

  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState("");
  const [usingAnd , setUsingAnd] = useState("and")
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false)
  const [showExample, setShowExample] = useState(true)
  const [exampleNum, setExampleNum] = useState(1)
  const [index, setIndex] = useState(0)
  const [titleLeft, setTitleLeft] = useState("Autogram")
  const [titleRight, setTitleRight] = useState("Generator")
  

  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
  }

  function formatTime(time: number) {
    const seconds = String(Math.floor(time / 100))
    const milliseconds = String(time % 100).padStart(2, "0")
    return seconds + "." + milliseconds
  }

  useEffect(() => { // Timer
    if (!loading) return;
    setTime(0); 
    const intervalId = setInterval(() => {
      setTime(t => t + 1);
    }, 10);

    return () => clearInterval(intervalId);
  }, [loading]);

  useEffect(() => { // Title test
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % letters.length)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => { // Title Real Left
    const interval = setInterval(() => {
      if (!loading) return;
      setTitleLeft(prevTitle => {
      const indexToChange = getRandomInt(prevTitle.length)
      const letterIndex = getRandomInt(letters.length)
      const newLetter = letters[letterIndex]
      const upInt = getRandomInt(1)
      
      return (
        prevTitle.slice(0, indexToChange) +
        newLetter +
        prevTitle.slice(indexToChange + 1)
      )
    })
  }, 150)
    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => { // Title Real Right
    if (!loading) return;
    const interval = setInterval(() => {
      setTitleRight(prevTitle => {
      const indexToChange = getRandomInt(prevTitle.length)
      const letterIndex = getRandomInt(letters.length)
      const newLetter = letters[letterIndex]

      return (
        prevTitle.slice(0, indexToChange) +
        newLetter +
        prevTitle.slice(indexToChange + 1)
      )
    })
  }, 160)
    return () => clearInterval(interval)
  }, [loading])

  const runSolver = async () => {
    setLoading(true)
    const inputString = prefix + " " + usingAnd;
    const res = await fetch(`/api/solve?prefix=${encodeURIComponent(inputString)}`);
    const json = await res.json();

    if (json.data.message === "No solution found"){
      setResult("No solution found")
    } else {
      const newResult = pangramToSentence(prefix, usingAnd, json.data.message)
      setResult(newResult)
    }
    console.log(pangramToSentence(prefix, usingAnd, json.data.message))
    setLoading(false)
    setShowExample(false)
    setTitleLeft("Autogram")
    setTitleRight("Generator")
  };

  const resetSolver = () => {
    setResult("");
    setShowExample(true)
  }

  const loadExample = () => {
    if (exampleNum == 1) {
      setPrefix("This autogram contains");
      setUsingAnd("and");
      setExampleNum(2);
    } else if (exampleNum == 2) {
      setPrefix("Hey friend, this sentence has");
      setUsingAnd("&");
      setExampleNum(3)
    } else if (exampleNum == 3) {
      setPrefix("Mr. Sallows, this pangram contains")
      setUsingAnd("&");
      setExampleNum(4)
    } else if (exampleNum == 4) {
      setPrefix("Hello 507, this pangram contains")
      setUsingAnd("and");
      setExampleNum(1)
    }

    setShowExample(false);
  }
  
  return (
    <div className ="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full min-h-130">
      <div className="mt-30"></div>
      <div className="flex flex-row space-x-2">
        {titleLeft.split('').map((character, index) => (
          <LettersAnimation key={index} start={character}/>
        ))}
        <span className="text-6xl">&nbsp;</span>
        {titleRight.split('').map((character, index) => (
          <LettersAnimation key={index} start={character}/>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 w-fit mt-20">
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Type prefix here"
          className="flex w-90 p-2 border border-gray-300 rounded" 
        />
      
        <select
          className="flex p-2 border border-gray-300 rounded h-full" 
          value={usingAnd} 
          onChange={e => setUsingAnd(e.target.value)} 
        >
          <option value="and">and</option>
          <option value="&">&</option>
        </select>
        <div className="relative">
        <button
          onClick={() => setHelpOpen(!helpOpen)}
          className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600"
          aria-label="Help"
        >
          ?
        </button>
        {helpOpen && (
            <div className="absolute left-full ml-10 rounded-lg bg-white p-6 w-80 shadow-lg z-50 -translate-y-1/4 space-y-2">
              <p>
                <strong>Left box</strong>: the text you type here will appear at the beginning of the autogram, before the letter counts.
              </p>
              <p>
                <strong>Right box</strong>: the option you select here will be used to connect the Z to the end of the autogram. 
              </p>
              <p>
                If you select "and", then the autogram will end with "... <strong>and</strong> one Z". If you select "&", then the autogram will end with
                "... <strong>&</strong> one Z".
              </p>
              <p>
                Click "Load Example" and then "Search for Autogram" to see a demonstration!
              </p>
              <button
                onClick={() => setHelpOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                aria-label="Close help"
              >
                ✕
              </button>
            </div>
        )}
        </div>
    </div>

    <div className="mt-5">
    {(result && !loading && result !== "No solution found") && (
      <p className="font-bold">
        Autogram found in {formatTime(time)} seconds!
      </p>
    )}

    {(loading) && (
      <p>
        {formatTime(time)}s
      </p>
    )}
    </div>
    
  
    {(result && !loading) && (
      <div className="flex max-w-prose mx-auto justify-center pb-2">
        <p>
          {result}
        </p>
      </div> 
        
      )}
      {loading && (
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="flex flex-row space-x-4 mb-5">
        {(!loading && !result) && (
          <button onClick={runSolver} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Search for Autogram
          </button>
        )}
        {(!loading && result) && (
        <button onClick={resetSolver} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Try Again
        </button>
      )}
        {(!loading && showExample) && (
          <button onClick={loadExample} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Load Example
          </button>
        )}
      </div>
      </div>
      <div className="space-y-4 max-w-prose">
      <p>
        An <a target = "_blank" href="https://en.wikipedia.org/wiki/Autogram" className="text-blue-500 underline hover:text-blue-900">autogram</a> is 
        a sentence that describes itself by providing an inventory of its own characters. 
        A <a target = "_blank" href="https://en.wikipedia.org/wiki/Pangram" className="text-blue-500 underline hover:text-blue-900">pangram</a> is 
        a sentence that contains every letter of the alphabet. This website searches for autogramic pangrams (also called self-enumerating pangrams): sentences
        that have both of these properties!
      </p>
      <p>
        The first autogramic pangram in English was produced by Lee Sallows in 1984:
      </p>
        <blockquote className="border-l-4 border-gray-300 pl-4 max-w-prose">
          This pangram contains four as, one b, two cs, one d, thirty es, six fs, five gs, seven hs, eleven is, one j, 
          one k, two ls, two ms, eighteen ns, fifteen os, two ps, one q, five rs, twenty-seven ss, eighteen ts, two us, 
          seven vs, eight ws, two xs, three ys, & one z.        
        </blockquote>
      <p>
        This website is powered 
        by <a target = "_blank" href="https://docs.racket-lang.org/rosette-guide/index.html" className="text-blue-500 underline hover:text-blue-900">Rosette</a>, a
        solver-aided programming system built on top of the programming language Racket. 
      </p>

      </div>
    </div>
  

  );
}

