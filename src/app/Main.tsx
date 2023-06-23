"use client"

import Glass from "./Glass";
import { User } from "firebase/auth";
import { FormEvent, useRef, useState } from "react";
import { IncomeButton, IncomeInput } from "./Inputs";
import { Button } from "@/component/Button";

export default function Main({
  values: {
    current,
    total
  },
  updateCurrent,
  showHistory
}: { values: { session: User, current: number, total: number }, updateCurrent: (current: number, value: number) => Promise<void>, showHistory: () => void }) {

  const form = useRef<HTMLFormElement>(null);
  const spend = useRef<number | undefined>(undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = Number(formData.get("quantity")?.valueOf());
    const isIncome = Boolean(formData.get("income")?.valueOf());

    if (isNaN(q) || q === 0) {
      return;
    }
    const multiplier = isIncome ? -1 : 1;

    spend.current = q * multiplier;
    await updateCurrent(current - (q * multiplier), (q * multiplier));
    form.current?.reset();
  }

  async function onReset() {
    spend.current = current - total;
    await updateCurrent(total, current - total);
  }

  async function onUndo() {
    const correction = spend.current! * -1;
    spend.current = correction;
    await updateCurrent(current - correction, correction);
  }

  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Button bgColor="bg-secondary" className="absolute right-0 top-0 w-16 h-16 p-1 text-2xl z-20" onClick={showHistory}>📖</Button>
        <Glass
          percentage={Math.ceil((current / total) * 100)}
          current={current}
          spend={spend.current}
        />
      </div>
      <div className="pt-10 px-5 mx-auto max-w-[600px] w-full flex flex-col gap-3">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-6 gap-4 w-full"
          ref={form}
        >
          <IncomeInput />
          <IncomeButton />
          <Button className="col-span-3" bgColor="bg-secondary">NUEVO</Button>
        </form>
        <Button bgColor="bg-warning" textColor="text-black" onClick={onUndo} disabled={!spend}>DESHACER</Button>
        <Button onClick={onReset} bgColor="bg-danger">REINCIAR GASTOS</Button>
      </div>
    </main>
  );
}