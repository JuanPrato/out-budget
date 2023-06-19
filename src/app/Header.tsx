"use client";

import Link from "next/link";
import { useSession } from "@/hook/useSession";
import { twMerge } from "tailwind-merge";

enum BG_PERCETAGES {
  DEAD = 10,
  DANGER = 20,
  WARNING = 60,
  GOOD = 100
}

const BGS = {
  [BG_PERCETAGES.GOOD]: "good",
  [BG_PERCETAGES.WARNING]: "warning",
  [BG_PERCETAGES.DANGER]: "danger",
  [BG_PERCETAGES.DEAD]: "dead"
}

function getBudgetClasses(percentage: number) {

  let bg: string;
  const aux = Math.ceil(percentage / 10) * 10;
  const showP: number = aux < 0 ? 100 : aux;

  if (percentage <= BG_PERCETAGES.DEAD) {
    bg = BGS[BG_PERCETAGES.DEAD];
  } else if (percentage <= BG_PERCETAGES.DANGER) {
    bg = BGS[BG_PERCETAGES.DANGER];
  } else if (percentage <= BG_PERCETAGES.WARNING) {
    bg = BGS[BG_PERCETAGES.WARNING];
  } else {
    bg = BGS[BG_PERCETAGES.GOOD];
  }

  return `before:bottom-[${showP}%] after:bottom-[${showP}%] bg-${bg}`

}

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
            <h2 className="text-2xl font-semibold text-white">{profile?.linkProfile.username}</h2>
            <div className={twMerge("bg-warning before:bg-secondary after:bg-secondary before:bg-opacity-60 ring ring-borderGlass water h-10 w-10 rounded-full", getBudgetClasses(Math.ceil((profile.linkProfile.current / profile.linkProfile.total) * 100)))} />
          </div>
        )
      }
    </header>
  )
}