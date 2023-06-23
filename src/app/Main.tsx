"use client"

import Glass from "./Glass";
import { User } from "firebase/auth";
import { useRef } from "react";
import { Button } from "@/components/Button";
import MainForm from "@/components/MainForm";
import { randomBytes } from "crypto";

interface Props {
  values: { session: User, current: number, total: number };
  updateCurrent: (current: number, value: number) => Promise<void>;
  showHistory: () => void;
}

export type Spend = {
  value: number;
  id: string;
}

export default function Main({
  values: {
    current,
    total
  },
  updateCurrent,
  showHistory
}: Props) {

  const spend = useRef<Spend | undefined>(undefined);

  async function onSubmit(values: { value: number, income: boolean }) {
    const q = values.value;
    const isIncome = Boolean(values.income);

    if (isNaN(q) || q === 0) {
      return;
    }
    const multiplier = isIncome ? -1 : 1;

    spend.current = { value: q * multiplier, id: randomBytes(32).toString() };
    await updateCurrent(current - (q * multiplier), (q * multiplier));
  }

  async function onReset() {
    spend.current = { value: current - total, id: randomBytes(32).toString() };
    await updateCurrent(total, current - total);
  }

  async function onUndo() {
    const correction = spend.current!.value * -1;
    spend.current = { value: correction, id: randomBytes(32).toString() };
    await updateCurrent(current - correction, correction);
  }

  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Button bgColor="bg-secondary" className="absolute right-2 top-0 w-16 h-16 p-1 text-2xl z-20" onClick={showHistory}>📖</Button>
        <Glass
          percentage={Math.ceil((current / total) * 100)}
          current={current}
          spend={spend.current}
        />
      </div>
      <div className="pt-10 px-5 mx-auto max-w-[600px] w-full flex flex-col gap-3">
        <MainForm onSubmit={onSubmit} />
        <Button bgColor="bg-warning" textColor="text-black" onClick={onUndo} disabled={!spend.current}>DESHACER</Button>
        <Button onClick={onReset} bgColor="bg-danger">REINCIAR GASTOS</Button>
      </div>
    </main>
  );
}