"use client";

import app from "@/firebase/config";
import { useSession } from "@/hook/useSession";
import { getAuth } from "firebase/auth"
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const auth = getAuth(app);

export default function LogIn() {

  const { session, signIn } = useSession();
  const router = useRouter();

  if (!!session) {
    router.push("/");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;

    if (!email || !password) {
      return;
    }

    await signIn(email, password);
    router.push("/");
  }

  return (
    <div className="h-full w-full bg-primary grid place-items-center">
      <form className="p-5 bg-secondary rounded-xl text-white" onSubmit={onSubmit}>
        <label className="font-bold text-xl my-2 block">
          EMAIL
          <input type="email" placeholder="juan@juan.com" className="p-2 rounded-lg font-semibold block text-black" name="email" />
        </label>
        <label className="font-bold text-xl my-2 block">
          CONTRASEÑA
          <input type="password" placeholder="cositas" className="p-2 rounded-lg font-semibold block text-black" name="password" />
        </label>
        <button className="bg-good text-black p-3 rounded-xl font-bold text-lg">LOGIN</button>
      </form>
    </div>
  )
}