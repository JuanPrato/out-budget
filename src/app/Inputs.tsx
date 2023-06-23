"use client";

import { Button } from "@/components/Button";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
  register: UseFormRegisterReturn;
  error?: boolean;
}

type ButtonProps = Props & {
  value: boolean;
  setValue: (v: boolean) => void;
}

export function IncomeButton({ register, value, setValue }: ButtonProps) {

  return (
    <Button
      className={twMerge("bg-danger p-5 rounded-xl text-white flex gap-3 justify-center transition-colors font-bold col-span-3", value && "bg-good text-black")}
      onClick={() => setValue(!value)}
      type="button">
      {
        value ? "INGRESO" : "GASTO"
      }
      <input
        type="checkbox"
        readOnly
        className="hidden"
        {...register}
      />
    </Button>
  );
}

export function IncomeInput({ register, error }: Props) {
  return (
    <div className={twMerge("flex w-full col-span-6 bg-white rounded-lg", error && "border border-danger")}>
      <span className="min-w-[50px] text-2xl grid place-items-center font-bold">$</span>
      <input
        type="text"
        placeholder="2500"
        className="p-3 text-2xl rounded-lg font-semibold block text-black w-full focus:outline-none"
        autoComplete="off"
        inputMode="numeric"
        {...register}
      />
    </div>
  );

}