"use client";

import { useRouter } from "next/navigation";
import { saveTotal } from "./actions";
import { useSession } from "@/hook/useSession";
import { FormEvent, useEffect } from "react";

export default function SetValues() {

  const { session, profile, updateProfile } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  if (!session) return;

  async function onSubtmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const total = Number(formData.get("total")?.valueOf());
    const username = formData.get("username")?.valueOf() as string | undefined;
    const linked = formData.get("linked")?.valueOf() as string | undefined;

    if (isNaN(total) || !username) {
      return;
    }

    await updateProfile({
      total, username, linked
    });
  }

  return (
    <div className="h-full w-full bg-primary grid place-items-center">
      <form className="p-5 bg-secondary rounded-xl text-white" onSubmit={onSubtmit}>
        <button onClick={() => router.push("/")} type="button">⬅️</button>
        <label className="font-bold text-xl my-2 block">
          TOTAL
          <input type="text" placeholder="1500" className="p-2 rounded-lg font-semibold block text-black" name="total" defaultValue={profile?.total} />
        </label>
        <label className="font-bold text-xl my-2 block">
          USUARIO
          <input
            type="text"
            placeholder="Juan"
            className="p-2 rounded-lg font-semibold block text-black"
            name="username"
            defaultValue={profile?.username}
          />
        </label>
        <label className="font-bold text-xl my-2 block">
          USUARIO LINKEADO
          <input type="text" placeholder="gloria@gloria.com" className="p-2 rounded-lg font-semibold block text-black" name="linked" defaultValue={profile?.linked} />
        </label>
        <button className="bg-good text-black p-3 rounded-xl font-bold text-lg">GUARDAR</button>
      </form>
    </div>
  )
}