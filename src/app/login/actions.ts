"use server";

import app from "@/firebase/config";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logIn(formData: FormData) {
  "use server";
  const email = formData.get("email")?.valueOf() as string;
  const password = formData.get("password")?.valueOf() as string;

  if (!email || !password) {
    return;
  }

  const auth = getAuth(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    return;
  }
  revalidatePath("/");
  redirect("/");
}
