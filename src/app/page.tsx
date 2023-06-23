"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import { useSession } from "@/hook/useSession";
import { useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "@/component/Button";

export default function Home() {

  const { session, profile, updateProfile, addHistory, loading } = useSession();
  const router = useRouter();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.push("/login");
      return;
    }
    if (!profile) {
      const p = new URLSearchParams();
      p.set("new", "true");
      router.push(`/profile?${p.toString()}`);
      return;
    }
  }, [router, session, profile, loading]);

  if (!session || !profile || loading) return <div className="h-screen w-screen overflow-hidden grid place-items-center bg-primary">
    <Image src="/loading.svg" width={75} height={75} alt="loading svg" className="animate-spin -ml-1 mr-3" />
  </div>;

  async function updateCurrent(current: number, value: number) {
    await updateProfile({ current });
    await addHistory(value * -1);
  }

  return (
    <div className="relative">
      <Header />
      <Main values={{ session, ...profile }} updateCurrent={updateCurrent} showHistory={() => setShowHistory(s => !s)} />
      <div className={twMerge("bg-transparent absolute bottom-0 h-full w-full z-30 overflow-hidden transition-[max-width] duration-300 flex", showHistory ? "max-w-full" : "max-w-[0px]")}>
        <div className="w-[80%] h-full bg-secondary flex flex-col p-4 shadow-2xl">
          <h2 className="text-3xl my-2 text-white">HISTORIAL</h2>
          {/* <Button onClick={() => setShowHistory(s => !s)} className="w-[25%] p-1">❌</Button> */}
          <ul>
            <li>COSA1</li>
            <li>COSA2</li>
            <li>COSA3</li>
            <li>COSA4</li>
          </ul>
        </div>
        <div className="w-[20%] bg-transparent h-full" onClick={(e) => setShowHistory(h => false)}></div>
      </div>
    </div>
  )
}
