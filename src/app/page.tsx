"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import { useSession } from "@/hook/useSession";
import { useEffect } from "react";

export default function Home() {

  const { session, profile, updateCurrent } = useSession();
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

  return (
    <>
      <Header />
      <Main values={{ session: session!, current: profile!.current, total: profile!.total }} updateCurrent={updateCurrent} />
    </>
  )
}
