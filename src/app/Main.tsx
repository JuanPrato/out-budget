"use client"

import Glass from "./Glass";
import { User } from "firebase/auth";
import { FormEvent, useRef, useState } from "react";
import { IncomeButton, IncomeInput } from "./Inputs";

export default function Main({
  values: {
    current,
    total
  },
  updateCurrent
}: { values: { session: User, current: number, total: number }, updateCurrent: (current: number) => Promise<void> }) {

  const form = useRef<HTMLFormElement>(null);
  const [spend, setSpend] = useState<{ spend: number } | undefined>(undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = Number(formData.get("quantity")?.valueOf());
    const isIncome = Boolean(formData.get("income")?.valueOf());

    if (isNaN(q) || q === 0) {
      return;
    }

    const multiplier = isIncome ? -1 : 1;
    await updateCurrent(current - (q * multiplier));
    form.current?.reset();
    setSpend({ spend: q * multiplier });
  }

  async function onReset() {
    await updateCurrent(total);
    setSpend({ spend: current - total });
  }

  async function onUndo() {
    const correction = spend!.spend * -1;
    await updateCurrent(current - correction);
    setSpend({ spend: correction });
  }

  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Glass
          percentage={Math.ceil((current / total) * 100)}
          current={current}
          spend={spend}
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
          <button className="bg-secondary p-5 rounded-xl text-bold text-white col-span-3">NUEVO</button>
        </form>
        <button className="bg-warning text-black disabled:bg-opacity-60 p-5 rounded-xl text-bold w-full" onClick={onUndo} disabled={!spend}>DESHACER</button>
        <button className="bg-danger p-5 rounded-xl text-bold text-white w-full" onClick={onReset}>REINCIAR GASTOS DEL MES</button>
      </div>
    </main>
  );
}