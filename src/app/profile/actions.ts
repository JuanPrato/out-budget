"use server";

import app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { redirect } from "next/navigation";

export async function saveTotal(formData: FormData) {
  const auth = getAuth(app);
  const total = formData.get("total")?.valueOf();
  const username = formData.get("username")?.valueOf();
  const linked = formData.get("linked")?.valueOf();

  if (!total || isNaN(Number(total))) return;

  const user = auth.currentUser;
  if (!user) {
    redirect("/");
  }
  const db = getDatabase(app);

  await set(ref(db, user!.uid), {
    total: Number(total),
    current: Number(total),
    username,
    linked,
  });
}
