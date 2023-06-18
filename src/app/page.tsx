"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import { useSession } from "@/hook/useSession";

export default function Home() {

  const { session, profile, updateCurrent } = useSession();
  const router = useRouter();

  if (!session) {
    console.log("not session");
    router.push("/login");
    return;
  }

  if (!profile) {
    console.log("not profile");
    router.push("/profile");
    return;
  }

  return (
    <>
      <Header />
      <Main values={{ session, ...profile }} updateCurrent={updateCurrent} />
    </>
  )
}
