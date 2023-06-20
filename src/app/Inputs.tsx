"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function IncomeButton() {

  const [value, setValue] = useState(false);

  return (
    <button className={twMerge("bg-danger p-5 rounded-xl text-white flex gap-3 justify-center transition-colors font-bold col-span-3", value && "bg-good text-black")} onClick={() => setValue(v => !v)} type="button">{value ? "INGRESO" : "EGRESO"}<input checked={value} type="hidden" name="income" readOnly className="w-[20px] h-[20px]" /></button>
  );
}

export function IncomeInput() {

  return (
    <div className="flex w-full col-span-6 bg-white rounded-lg">
      <span className="min-w-[50px] text-2xl grid place-items-center font-bold">$</span>
      <input type="text" placeholder="2500" name="quantity" className="p-3 text-2xl rounded-lg font-semibold block text-black w-full focus:outline-none" autoComplete="off" />
    </div>
  );

}