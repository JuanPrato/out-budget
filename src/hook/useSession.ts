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
  orderBy,
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

export type HistoryItem = {
  value: number;
  created_at: Date;
};

export type ReturnSessionContext = {
  session: Session;
  profile: Profile | null;
  register: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (u: Partial<Profile>, isNew?: boolean) => Promise<void>;
  addHistory: (v: number) => Promise<void>;
  getHistory: () => Promise<HistoryItem[]>;
  loading: boolean;
};

export function useSessionContext(): ReturnSessionContext {
  const [db] = useState(() => getFirestore(app));
  const [session, setSession] = useState<Session>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sp: any;
    let sh: any;
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

        if (!profileDB) {
          setLoading(false);
          setProfile(null);
          return;
        }

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
          }
        }

        setLoading(false);
        setProfile({ ...profileDB });
      });
    });
    return () => {
      s && s();
      sp && sp();
      sh && sh();
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

  async function updateProfile(
    profileUpdate: Partial<Profile>,
    isNew?: boolean
  ) {
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

    if (isNew) {
      await addDoc(collection(db, "users"), profileUpdate);
    } else {
      await updateDoc(profileRef, profileUpdate);
    }
  }

  async function addHistory(value: number) {
    await addDoc(collection(db, "users", session!.uid, "history"), {
      value,
      created_at: new Date(),
    });
  }

  async function getHistory() {
    const historyQuery = query(
      collection(db, "users", session!.uid, "history"),
      orderBy("created_at", "desc")
    );

    return (
      ((await getDocs(historyQuery)).docs.map((d) => {
        const data = d.data();
        return {
          value: data.value,
          created_at: data.created_at.toDate(),
        };
      }) as HistoryItem[]) || []
    );
  }

  return {
    session,
    profile,
    register,
    signIn,
    signOut,
    updateProfile,
    addHistory,
    getHistory,
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
