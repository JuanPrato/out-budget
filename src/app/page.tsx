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
      router.push("/profile");
      return;
    }
  }, []);

  if (!session || !profile) return;

  return (
    <>
      <Header />
      <Main values={{ session, ...profile }} updateCurrent={(current: number) => updateProfile({ current })} />
    </>
  )
}
