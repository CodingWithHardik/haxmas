"use client";
import JollyOrpheusClick from "@/components/JollyOrpheusClick";
import {useEffect, useState} from "react";

export default function Home() {
  const [count, setCount] = useState(0); // useState!
  const [img, setImg] = useState("1.png");

  useEffect(() => {
    console.log(`[${count}] boop`)
    const audio = new Audio("/nom-nom-nom_gPJiWn4.mp3");
    if (count > 0 ) {
      audio.play();
      setTimeout(() => {
        setImg("2.png");
      }, 100);
      setTimeout(() => {
        setImg("3.png");
      }, 200);
      setTimeout(() => {
        setImg("4.png");
      }, 300);
      setTimeout(() => {
        setImg("5.png");
      }, 400);
      setTimeout(() => {
        setImg("6.png");
      }, 500);
      setTimeout(() => {
        setImg("7.png");
      }, 600);
      setTimeout(() => {
        setImg("8.png");
      }, 700);
      setTimeout(() => {
        setImg("9.png");
      }, 800);
      setTimeout(() => {
        setImg("10.png");
      }, 900);
      setTimeout(() => {
        setImg("1.png");
      }, 1000);
    }

  }, [count]);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f472a] to-[#1a5a3a] flex flex-col">
      <img src={`/Image copy.png`} className="justify-start items-start w-full h-30"></img>
      <main className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className={"text-6xl self-center my-10 font-deca"}>Merry Christmas</h1>
          <p className={"text-3xl font-bold"}>Count: {count}</p>
          <JollyOrpheusClick onClick={() => {setCount(count + 1)}} img={img} />
        </div>
      </main>
    </div>
  );
}