'use client'
import React, { useState } from "react";
import { pangramToSentence } from '@/app/utils/pangramToSentence';



export default function Page() {

  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState("");

  

  const runSolver = async () => {
  const res = await fetch(`/api/solve?prefix=${encodeURIComponent(prefix)}`);
  const json = await res.json();
  if (json.data.message === "No solution found"){
    setResult("No solution found")
  } else {
    setResult(pangramToSentence(prefix, json.data.message))
  }
    console.log(pangramToSentence(prefix, json.data.message))
  };


  

  return (
    <div>
    <p>Try typing: "I love Bella!, And this sentence has and"</p>
    <p>Or, to find the first every english self-enumerating pangram, type: "This pangram contains &"</p>
    <div className="flex w-full space-x-2">
      <input
        type="text"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        placeholder="Type prefix here"
        // Use 'flex-grow' to make the input take up all available space
        className="flex-grow p-2 border border-gray-300 rounded" 
      />
  <button onClick={runSolver} className="bg-blue-500 text-white p-2 rounded">Submit</button>
  </div>
    {result && (
        <p>
          {result}
        </p>
      )}
    </div>
    
  );
}
