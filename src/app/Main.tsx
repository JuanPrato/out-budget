"use client"

import Glass from "./Glass";
import { User } from "firebase/auth";
import { FormEvent, useRef } from "react";

export default function Main({
  values: {
    current,
    total
  },
  updateCurrent
}: { values: { session: User, current: number, total: number }, updateCurrent: (current: number) => void }) {

  const form = useRef<HTMLFormElement>(null);

  async function updateCurrentS(change: number) {
    if (change === 0) return;
    updateCurrent(change);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("quantity")?.valueOf() as string;
    if (isNaN(Number(q))) {
      return;
    }
    await updateCurrentS(current - Number(q));
    form.current?.reset();
  }

  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Glass percentage={Math.ceil((current / total) * 100)} current={current} />
      </div>
      <div className="p-10 mx-auto flex flex-col gap-3">
        <form
          onSubmit={onSubmit}
          className="flex gap-4"
          ref={form}
        >
          <input type="text" placeholder="2500" name="quantity" className="p-3 text-xl rounded-lg font-semibold block text-black" />
          <button className="bg-secondary p-5 rounded-xl text-bold text-white">NUEVO GASTO</button>
        </form>
        <button className="bg-danger p-5 rounded-xl text-bold text-white w-full" onClick={() => updateCurrentS(total)}>REINCIAR GASTOS DEL MES</button>
      </div>
    </main>
  );
}