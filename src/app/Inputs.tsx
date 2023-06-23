"use client";

import { Button } from "@/components/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function IncomeButton() {

  const [value, setValue] = useState(false);

  return (
    <Button
      className={twMerge("bg-danger p-5 rounded-xl text-white flex gap-3 justify-center transition-colors font-bold col-span-3", value && "bg-good text-black")}
      onClick={() => setValue(v => !v)}
      type="button">
      {
        value ? "INGRESO" : "GASTO"
      }
      <input checked={value} type="checkbox" name="income" readOnly className="hidden" />
    </Button>
  );
}

export function IncomeInput() {

  return (
    <div className="flex w-full col-span-6 bg-white rounded-lg">
      <span className="min-w-[50px] text-2xl grid place-items-center font-bold">$</span>
      <input type="text" placeholder="2500" name="quantity" className="p-3 text-2xl rounded-lg font-semibold block text-black w-full focus:outline-none" autoComplete="off" inputMode="numeric" />
    </div>
  );

}