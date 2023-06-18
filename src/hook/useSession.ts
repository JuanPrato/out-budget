import app from "@/firebase/config";
import {
  User,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  query,
  equalTo,
  child,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

type Profile = {
  total: number;
  current: number;
  username: string;
  linked?: string;
  linkProfile?: Omit<Profile, "linkUser">;
};

const auth = getAuth(app);
let userS: User | null = null;
let profileS: Profile | null = null;

export function useSession() {
  const [session, setSession] = useState<User | null>(userS);
  const [profile, setProfile] = useState<Profile | null>(profileS);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setSession(user);
      userS = user;
      if (!user) {
        setProfile(null);
        return;
      }
      const db = getDatabase(app);

      const profileRef = ref(db, `${user.uid}`);
      const data = await get(profileRef);
      const val = data.val() as Profile;
      setProfile(val);
      if (val.linked) {
        const linkedProfileRef = ref(db);
        const users: { [key: string]: Profile } = (
          await get(linkedProfileRef)
        ).val();
        val.linkProfile = Object.values(users).find(
          (u) => u.username === val.linked
        );
      }
      setProfile({ ...val });
      profileS = { ...val };
    });
  }, []);

  async function signIn(email: string, password: string) {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signOut() {
    await signOutFirebase(auth);
  }

  async function updateCurrent(current: number) {
    const db = getDatabase(app);
    const profileRef = ref(db, session!.uid);
    await update(profileRef, { current });
    setProfile((p) => (p ? { ...p, current } : p));
  }

  return {
    session,
    profile,
    signIn,
    signOut,
    updateCurrent,
  };
}
