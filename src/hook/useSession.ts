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
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
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
  addHistory: (v: number) => Promise<void>;
  loading: boolean;
};

export function useSessionContext(): ReturnSessionContext {
  const [db] = useState(() => getFirestore(app));
  const [session, setSession] = useState<Session>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sp: any;
    const s = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setSession(user);
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const profileDoc = doc(db, "users", user.uid);
      sp = onSnapshot(profileDoc, async (userDB) => {
        const profileDB = userDB.data() as Profile;

        if (profileDB?.linked) {
          const userLinkedQuery = query(
            collection(db, "users"),
            where("username", "==", profileDB.linked)
          );
          const links = await getDocs(userLinkedQuery);
          if (!links.empty) {
            const linkedQuery = doc(db, "users", links.docs[0].id);
            onSnapshot(linkedQuery, (userLinked) => {
              profileDB.linkProfile = userLinked.data() as Profile;
              setLoading(false);
              setProfile({ ...profileDB });
            });
          } else {
            setLoading(false);
            setProfile({ ...profileDB });
          }
        } else {
          setLoading(false);
          setProfile(profileDB && { ...profileDB });
        }
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
    const profileRef = doc(db, "users", session!.uid);

    if (profileUpdate.username) {
      const posible = query(
        collection(db, "users"),
        where("username", "==", profileUpdate.username)
      );
      const user = await getDocs(posible);
      const q = user.size;
      if (q !== 0 && !user.docs.some((d) => d.id === session?.uid)) {
        throw new Error("El usuario utilizado ya esta en uso");
      }
    }
    await updateDoc(profileRef, profileUpdate);
  }

  async function addHistory(value: number) {
    await addDoc(collection(db, "users", session!.uid, "history"), {
      value,
      created_at: new Date(),
    });
  }

  return {
    session,
    profile,
    register,
    signIn,
    signOut,
    updateProfile,
    addHistory,
    loading,
  };
}

export function useSession() {
  const session = useContext(sessionContext);

  if (!session) {
    throw new Error("Invalid invocation");
  }

  return session;
}
