"use client";
import JollyOrpheusClick from "@/components/JollyOrpheusClick";
import {useEffect, useState} from "react";

export default function Home() {
  const [count, setCount] = useState(0); // useState!

  useEffect(() => {
    console.log(`[${count}] boop`)
  }, [count]);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f472a] to-[#1a5a3a] flex flex-col">
      <main className="flex min-h-screen flex-col items-center justify-between py-32 px-16 bg-linear-to-br from-[#0f472a] to-[#1a5a3a]">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className={"text-6xl self-center my-10"}>Haxmas Day 1</h1>
          <p className={"text-3xl font-bold"}>Count: {count}</p> // this is how you use state variables
          <JollyOrpheusClick onClick={() => {setCount(count + 1)}} />
        </div>
      </main>
    </div>
  );
}