import Header from "./Header";
import { get, getDatabase, ref } from "firebase/database";
import Main from "./Main";
import { use } from "react";
import { app } from "@/utils/firebase";

export default function Home() {

  const db = getDatabase(app);

  const profileRef = ref(db, "juan/");
  const data = use(get(profileRef));

  return (
    <>
      <Header />
      <Main initialValues={data.val()} />
    </>
  )
}
