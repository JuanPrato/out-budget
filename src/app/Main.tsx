"use client"

import { app } from "@/utils/firebase";
import Glass from "./Glass";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

export default function Main({ initialValues: { current, total } }: { initialValues: { current: number, total: number } }) {

  const db = getDatabase(app);

  async function updateCurrent(change: number) {

    if (change === 0) return;

    const profileRef = ref(db, "juan");
    await update(profileRef, { current: change, total });
  }

  const [value, setValue] = useState(current);

  useEffect(() => {
    const profileRef = ref(db, "juan");
    const s = onValue(profileRef, (sp) => {
      setValue(sp.val().current);
    });
    return () => s();
  }, []);

  return (
    <main className='flex flex-col bg-primary grow py-5'>
      <div className='relative w-full max-w-[450px] mx-auto'>
        <Glass percentage={Math.ceil((value / total) * 100)} current={value} />
      </div>
      <div className="p-10 text-center flex gap-3">
        <button className="bg-secondary p-5 rounded-xl text-bold text-white" onClick={() => updateCurrent(value - 2500)}>NUEVO GASTO</button>
        <button className="bg-secondary p-5 rounded-xl text-bold text-white" onClick={() => updateCurrent(25000)}>REINCIAR GASTO</button>
      </div>
    </main>
  );
}