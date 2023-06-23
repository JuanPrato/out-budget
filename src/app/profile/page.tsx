"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/hook/useSession";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useTheme } from "@/hook/useTheme";

export default function SetValues() {

  const { session, profile, updateProfile, addHistory } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | undefined>();

  const { dark, switchDarkMode } = useTheme();
  const newProfile = params.get("new") === "true";

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
      }, newProfile);

      if (newProfile) {
        await addHistory(total);
      }
    } catch (e) {
      setError((e as Error).message);
      return;
    }

    router.push("/");
  }

  return (
    <div className="h-full w-full bg-primary flex flex-col justify-center">
      <div className="bg-secondary grid grid-cols-[15%_1fr_15%] p-2">
        <Button onClick={() => router.push("/")} type="button" textColor="text-black">⬅</Button>
        <h1 className="text-center text-4xl font-bold text-white flex justify-center gap-4 items-center"><span className="hidden md:inline">PRESUPUESTO</span> <Image alt="logo" src="/logo3.png" width={75} height={75} className="inline w-16 h-16" /></h1>
        <Button onClick={switchDarkMode}>{dark ? "☀️" : "🌙"}</Button>
      </div>
      <div className="grow grid place-items-center">
        <form className="p-5 flex flex-col gap-2 bg-secondary rounded-xl text-white" onSubmit={onSubtmit}>
          {newProfile && <legend>Para continuar debes crear un perfil</legend>}
          <label className="font-bold text-xl my-2 block">
            PRESUPUESTO TOTAL*
            <input type="text" placeholder="1500" className="p-2 rounded-lg font-semibold block text-black" name="total" defaultValue={profile?.total} />
          </label>
          <label className="font-bold text-xl my-2 block">
            NOMBRE DE USUARIO*
            <input
              type="text"
              placeholder="Juan"
              className="p-2 rounded-lg font-semibold block text-black"
              name="username"
              defaultValue={profile?.username}
            />
          </label>
          <label className="font-bold text-xl my-2 block">
            COMPAÑERO <span className="text-sm text-gray-300">(opcional)</span>
            <input type="text" placeholder="Usuario del compañero" className="p-2 rounded-lg font-semibold block text-black" name="linked" defaultValue={profile?.linked} />
          </label>
          {
            <p className="text-warning text-lg font-semibold max-w-[14rem]">{error}</p>
          }
          <button className="bg-good text-black p-3 rounded-xl font-bold text-lg">GUARDAR Y CONTINUAR</button>
        </form>
      </div>
    </div>
  )
}