'use client'
import React, { useState } from "react";
import { pangramToSentence } from '@/app/utils/pangramToSentence';



export default function Page() {

  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState("");
  const [usingAnd , setUsingAnd] = useState("and")
  const [loading, setLoading] = useState(false)

  const runSolver = async () => {
    setLoading(true)
    const inputString = prefix + " " + usingAnd
    const res = await fetch(`/api/solve?prefix=${encodeURIComponent(inputString)}`);
    const json = await res.json();
    if (json.data.message === "No solution found"){
      setResult("No solution found")
    } else {
      setResult(pangramToSentence(prefix, usingAnd, json.data.message))
    }
    console.log(pangramToSentence(prefix, usingAnd, json.data.message))
    setLoading(false)
  };


  

  return (
    <div className ="flex flex-col justify-center space-y-2 items-center h-screen w-full bg-gray-100">
    
    <div className="flex w-full justify-center space-x-2">
      <input
        type="text"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        placeholder="Type prefix here"
        className="flex w-64 p-2 border border-gray-300 rounded" 
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
  
  



    {(result && !loading) && (
        <p>
          {result}
        </p>
      )}
    <button onClick={runSolver} className="bg-blue-500 text-white p-2 rounded">Search for Pangram</button>
    </div>
    
  );
}
