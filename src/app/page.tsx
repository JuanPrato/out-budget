"use client";

import { useState } from "react";
import Header from "./Header";
import Glass from "./Glass";

const TOTAL: number = 25000;

export default function Home() {

  const [current, setCurrent] = useState<number>(TOTAL);

  const newValue = () => {
    if (current === 0) return;
    setCurrent((c) => c - 2500);
  }

  return (
    <main className='flex flex-col gap-4 bg-primary h-screen w-screen'>
      <Header />
      <div className='relative w-full flex flex-col justify-end max-w-[450px] mx-auto'>
        <Glass percentage={Math.ceil((current / TOTAL) * 100)} current={current} />
      </div>
      <div className="p-10 text-center">
        <button className="bg-secondary p-5 rounded-xl text-bold text-white" onClick={newValue}>NUEVO GASTO</button>
      </div>
    </main>
  )
}
