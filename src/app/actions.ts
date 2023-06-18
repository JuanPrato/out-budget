"use server";

import app from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  "use server";

  const auth = getAuth(app);

  signOut(auth);
  revalidatePath("/");
}
