import { sessionContext } from "@/firebase/Context";
import app from "@/firebase/config";
import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  update,
  onValue,
  get,
  equalTo,
  orderByChild,
  query,
  child,
} from "firebase/database";
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
  register: (email: string, password: string) => Promise<void>;
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

      const profileRef = ref(db, user.uid);
      sp = onValue(profileRef, async (userDB) => {
        const profileDB = userDB.val() as Profile;

        if (profileDB?.linked) {
          const userLinkedRef = query(
            child(ref(db), "/"),
            orderByChild("username"),
            equalTo(profileDB.linked)
          );
          onValue(userLinkedRef, (userLinked) => {
            profileDB.linkProfile =
              (Object.values(userLinked.val())[0] as Profile) || undefined;
            if (!profileDB.linkProfile) return;
            setProfile({ ...profileDB });
          });
        }

        setProfile(profileDB && { ...profileDB });
      });
    });
    return () => {
      s && s();
      sp && sp();
    };
  }, []);

  async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

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

    if (profileUpdate.username) {
      const posible = query(
        child(ref(db), "/"),
        orderByChild("username"),
        equalTo(profileUpdate.username)
      );
      const user = (await get(posible)).val();
      if (user[session!.uid] === undefined) {
        throw new Error("used username");
      }
    }

    await update(profileRef, profileUpdate);
    setProfile((p) => (p ? { ...p, ...profileUpdate } : p));
  }

  return {
    session,
    profile,
    register,
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
