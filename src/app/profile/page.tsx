"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/hook/useSession";
import { FormEvent, useEffect, useState } from "react";

export default function SetValues() {

  const { session, profile, updateProfile } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | undefined>();

  const newProfile = params.get("new");

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
      setError("Invalid total or username");
      return;
    }

    try {
      await updateProfile({
        total,
        username,
        linked,
        current: newProfile ? total : undefined
      });
    } catch (e) {
      setError((e as Error).message);
      return;
    }

    router.push("/");
  }

  return (
    <div className="h-full w-full bg-primary grid place-items-center">
      <form className="p-5 bg-secondary rounded-xl text-white" onSubmit={onSubtmit}>
        {newProfile && <legend>Para continuar debes crear un perfil</legend>}
        <button onClick={() => router.push("/")} type="button" className="bg-warning text-black px-2 py-1 rounded-xl font-bold ">ATRAS</button>
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
          <input type="text" placeholder="Usuari" className="p-2 rounded-lg font-semibold block text-black" name="linked" defaultValue={profile?.linked} />
        </label>
        {
          <p className="text-warning text-lg font-semibold max-w-[14rem]">{error}</p>
        }
        <button className="bg-good text-black p-3 rounded-xl font-bold text-lg">GUARDAR Y CONTINUAR</button>
      </form>
    </div>
  )
}