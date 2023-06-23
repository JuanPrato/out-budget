"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import { useSession } from "@/hook/useSession";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {

  const { session, profile, updateProfile, addHistory, loading } = useSession();
  const router = useRouter();

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
    await addHistory(value);
  }

  return (
    <>
      <Header />
      <Main values={{ session, ...profile }} updateCurrent={updateCurrent} />
    </>
  )
}
