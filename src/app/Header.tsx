"use client";

import Link from "next/link";
import { useSession } from "@/hook/useSession";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Button } from "@/components/Button";

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
      <div className="grid grid-cols-[15%_1fr_15%] max-w-[800px] mx-auto p-2">
        <Link
          className="bg-primary p-5 rounded-xl font-bold text-white text-center flex items-center gap-2 justify-center aspect-square sm:aspect-auto"
          href={"/profile"}
        >
          <Image src="/profile.svg" height={25} width={25} alt="profile" className="inline" />
          <span className="hidden sm:inline">PERFIL</span>
        </Link>
        <h1 className="text-center text-4xl font-bold text-white flex justify-center gap-4 items-center"><span className="hidden md:inline">PRESUPUESTO</span> <Image alt="logo" src="/logo3.png" width={75} height={75} className="inline w-16 h-16" /></h1>
        <Button
          onClick={signOut}
          className="flex items-center gap-2 justify-center aspect-square sm:aspect-auto"
        ><Image src="/exit.svg" height={25} width={25} alt="profile" /><span className="hidden sm:inline">SALIR</span></Button>
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