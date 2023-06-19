"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function IncomeButton() {

  const [value, setValue] = useState(false);

  return (
    <button className={twMerge("bg-danger p-5 rounded-xl text-white flex gap-3 justify-center transition-colors font-bold col-span-3", value && "bg-good text-black")} onClick={() => setValue(v => !v)} type="button">INGRESO <input checked={value} type="checkbox" name="income" id="" className="w-[20px] h-[20px]" /></button>
  );
}

export function IncomeInput() {

  return (
    <>
      <span className="col-span-1 text-3xl grid place-items-center font-bold">$</span>
      <input type="text" placeholder="2500" name="quantity" className="col-span-5 p-3 text-xl rounded-lg font-semibold block text-black" />
    </>
  );

}