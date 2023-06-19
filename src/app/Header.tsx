"use client";

import Link from "next/link";
import { useSession } from "@/hook/useSession";

export default function Header() {

  const { profile, signOut } = useSession();

  return (
    <header className="bg-secondary">
      <div className="grid grid-cols-[15%_1fr_15%] max-w-[800px] mx-auto">
        <Link
          className="bg-primary p-5 rounded-xl text-bold text-white text-center"
          href={"/profile"}
        >PERFIL</Link>
        <h1 className="text-center text-4xl font-bold pt-4 pb-2 text-white border-b">PRESUPUESTO</h1>
        <button
          onClick={signOut}
          className="bg-primary p-5 rounded-xl text-bold text-white"
        >SALIR</button>
      </div>
      {
        !!profile?.linkProfile && (
          <div className="flex items-center justify-center gap-5 py-2">
            <h2 className="text-2xl font-semibold text-white">{profile?.linkProfile?.username}</h2>
            <div className="bg-warning before:bg-secondary after:bg-secondary before:bg-opacity-60 ring ring-borderGlass water h-10 w-10 rounded-full after:bottom-[50%] before:bottom-[50%]" />
          </div>
        )
      }
    </header>
  )
}