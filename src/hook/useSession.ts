import { sessionContext } from "@/firebase/Context";
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
import { getDatabase, ref, get, update, onValue } from "firebase/database";
import { useContext, useEffect, useState } from "react";

type Profile = {
  total: number;
  current: number;
  username: string;
  linked?: string;
  linkProfile?: Omit<Profile, "linkUser">;
};

const auth = getAuth(app);

type Session = User | null;

export type ReturnSessionContext = {
  session: Session;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (u: Partial<Profile>) => Promise<void>;
};

export function useSessionContext(): ReturnSessionContext {
  const [session, setSession] = useState<Session>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let sp: any;
    const s = onAuthStateChanged(auth, async (user) => {
      setSession(user);
      if (!user) {
        setProfile(null);
        return;
      }
      const db = getDatabase(app);

      const profileRef = ref(db, `${user.uid}`);
      sp = onValue(profileRef, async (data) => {
        const profileDB = data.val() as Profile;

        if (profileDB.linked) {
          const linkedProfileRef = ref(db);
          const users: { [key: string]: Profile } = (
            await get(linkedProfileRef)
          ).val();
          profileDB.linkProfile = Object.values(users).find(
            (u) => u.username === profileDB.linked
          );
        }

        setProfile({ ...profileDB });
      });
    });
    return () => {
      s && s();
      sp && sp();
    };
  }, []);

  async function signIn(email: string, password: string) {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signOut() {
    await signOutFirebase(auth);
  }

  async function updateProfile(profileUpdate: Partial<Profile>) {
    const db = getDatabase(app);
    const profileRef = ref(db, session!.uid);
    await update(profileRef, profileUpdate);
    setProfile((p) => (p ? { ...p, ...profileUpdate } : p));
  }

  return {
    session,
    profile,
    signIn,
    signOut,
    updateProfile,
  };
}

export function useSession() {
  const session = useContext(sessionContext);

  if (!session) {
    throw new Error("Invalid invocation");
  }

  return session;
}
