"use client";

import { useSession } from "@/hook/useSession";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function LogIn() {

  const { session, signIn, register } = useSession();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!!session) {
      router.push("/");
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;

    if (!email || !password) {
      return;
    }

    try {
      if (isRegister) {
        await register(email, password);
        setIsRegister(false);
        form.current?.reset();
      } else {
        await signIn(email, password);
        router.push("/");
      }
    } catch (e) {
      return;
    }

  }

  return (
    <div className="h-full w-full bg-primary grid place-items-center">
      <form
        className="p-5 bg-secondary rounded-xl text-white"
        onSubmit={onSubmit}
        ref={form}>
        <label className="font-bold text-xl my-2 block">
          EMAIL
          <input type="email" placeholder="juan@juan.com" className="p-2 rounded-lg font-semibold block text-black" name="email" />
        </label>
        <label className="font-bold text-xl my-2 block">
          CONTRASEÑA
          <input type="password" placeholder="cositas" className="p-2 rounded-lg font-semibold block text-black" name="password" />
        </label>
        <button onClick={() => setIsRegister(i => !i)} className="block py-2 text-opacity-80 text-gray-100" type="button">
          {isRegister ? "Inicia sesion" : "Cuenta nueva?"}
        </button>
        <button className="bg-good text-black p-3 rounded-xl font-bold text-lg">{isRegister ? "REGISTRARME" : "INGRESAR"}</button>
      </form>
    </div>
  )
}