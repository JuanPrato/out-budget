"use client";

import app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { saveTotal } from "./actions";
import { useSession } from "@/hook/useSession";

export default function SetValues() {

  const { session, profile } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/");
    return;
  }

  return (
    <div className="h-full w-full bg-primary grid place-items-center">
      <form className="p-5 bg-secondary rounded-xl text-white" action={saveTotal}>
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