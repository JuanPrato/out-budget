"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import { useSession } from "@/hook/useSession";
import { useEffect } from "react";

export default function Home() {

  const { session, profile, updateProfile } = useSession();
  const router = useRouter();

  useEffect(() => {
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
  }, [router, session, profile]);

  if (!session || !profile) return <div className="h-screen w-screen overflow-hidden bg-primary"></div>;

  return (
    <>
      <Header />
      <Main values={{ session, ...profile }} updateCurrent={(current: number) => updateProfile({ current })} />
    </>
  )
}
