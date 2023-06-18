import Glass from "./Glass";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "./page";
import { revalidatePath } from "next/cache";

export default function Main({ initialValues: { current, total } }: { initialValues: { current: number, total: number } }) {

  async function updateCurrent() {
    "use server";

    const db = getDatabase(app);
    const profileRef = ref(db, "juan");
    await update(profileRef, { current: current - 2500, total });
    revalidatePath("/")
  }

  return (
    <main className='flex flex-col gap-4 bg-primary h-screen w-screen'>
      <div className='relative w-full flex flex-col justify-end max-w-[450px] mx-auto'>
        <Glass percentage={Math.ceil((current / total) * 100)} current={current} />
      </div>
      <div className="p-10 text-center">
        <form action={updateCurrent}>
          <button className="bg-secondary p-5 rounded-xl text-bold text-white">NUEVO GASTO</button>
        </form>
      </div>
    </main>
  );
}