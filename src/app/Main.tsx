"use client"

import app from "@/firebase/config";
import Glass from "./Glass";
import { getDatabase, ref, update } from "firebase/database";
import { User } from "firebase/auth";

export default function Main({ values: { session, current, total }, updateCurrent }: { values: { session: User, current: number, total: number }, updateCurrent: (current: number) => void }) {

  const db = getDatabase(app);

  async function updateCurrentS(change: number) {

    if (change === 0) return;

    updateCurrent(change);
  }


  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Glass percentage={Math.ceil((current / total) * 100)} current={current} />
      </div>
      <div className="p-10 text-center flex gap-3">
        <button className="bg-secondary p-5 rounded-xl text-bold text-white" onClick={() => updateCurrentS(current - 2500)}>NUEVO GASTO</button>
        <button className="bg-secondary p-5 rounded-xl text-bold text-white" onClick={() => updateCurrentS(25000)}>REINCIAR GASTO</button>
      </div>
    </main>
  );
}