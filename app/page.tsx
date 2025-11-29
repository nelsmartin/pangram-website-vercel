'use client'
import React, { useState } from "react";




export default function Page() {

  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState("");

  

  const runSolver = async () => {
  const res = await fetch(`/api/solve?prefix=${encodeURIComponent(prefix)}`);
  const json = await res.json();
  setResult(json.data); // this is Cloud Run's response
  };


  

  return (
    <div>
      <input
        type="text"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        placeholder="Type prefix here"
      />
    <button onClick={runSolver}>Generate Pangram</button>
    {result && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
    
  );
}
