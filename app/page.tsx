'use client';
import React, { useState, useEffect } from "react";
import { pangramToSentence } from '@/app/utils/pangramToSentence';
import Stopwatch from "@/app/stopwatch";

export default function Page() {

  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState("");
  const [usingAnd , setUsingAnd] = useState("and")
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(0);
  
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  
  function formatTime(time: number) {
    const seconds = String(Math.floor(time / 100))
    const milliseconds = String(time % 100).padStart(2, "0")
    return seconds + "." + milliseconds
  
}
  useEffect(() => {
  if (!loading) return;
  setTime(0); 
  const intervalId = setInterval(() => {
    setTime(t => t + 1);
  }, 10);

  return () => clearInterval(intervalId);
  }, [loading]);

  const runSolver = async () => {
    setLoading(true)
    const inputString = prefix + " " + usingAnd
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
  };

  const resetSolver = () => {
    setResult("")
  }
  
  const saveAutogram = async () =>  {
    const timeString = formatTime(time)
    const zConnector = usingAnd ? "and" : "&"
    await fetch("/api/autograms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: result,
          time: timeString,
          name: name,
          prefix: prefix,
          zConnector: zConnector,
        }),
      });
  }
  return (
    <div className ="flex flex-col justify-center space-y-2 items-center h-screen w-full bg-gray-100">
      <div className="flex w-full justify-center space-x-2">
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Type prefix here"
          className="flex w-80 p-2 border border-gray-300 rounded" 
        />
      <select
        className="flex p-2 border border-gray-300 rounded" 
        value={usingAnd} 
        onChange={e => setUsingAnd(e.target.value)} 
      >
        <option value="and">and</option>
        <option value="&">&</option>
      </select>
    </div>
    
    {(result && !loading && result !== "No solution found") && (
      <p className="font-bold">
        Solution found in {formatTime(time)} seconds!
      </p>
    )}

    {(loading) && (
      <p>
        {formatTime(time)}s
      </p>
    )}
    
  
    {(result && !loading) && (
      <div className="flex w-1/2 mx-auto justify-center pb-2">
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
      
      {(!loading && !result) && (
        <button onClick={runSolver} className="bg-blue-500 text-white p-2 rounded">Search for Autogram</button>
      )}
      <div className="space-x-2">
        {(result && !loading && result !== "No solution found") && (
          <button onClick={() => setIsSaving(true)} className="bg-blue-500 text-white p-2 rounded">Save Autogram</button>
        )}
        {(!loading && result) && (
          <button onClick={resetSolver} className="bg-blue-500 text-white p-2 rounded">Try Again</button>
        )}
      </div>

      {isSaving && (
      <div className="flex flex-col items-center space-y-2">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-64 p-2 border rounded"
        />

        <div className="flex space-x-2">
          <button
            onClick={() => {
              saveAutogram()
              setIsSaving(false);
              alert("Autogram saved! View it on the \"See Autograms\" page.")
            }
            }
            className="bg-green-600 text-white p-2 rounded"
          >
            Confirm Save
          </button>

          <button
            onClick={() => {
              setIsSaving(false);
              setName("");
            }}
            className="bg-gray-400 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    </div>

  );
}

