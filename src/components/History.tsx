import { HistoryItem } from "@/hook/useSession";
import { priceF } from "@/utils/formatter";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function History({ getHistory, show, onClose }: { getHistory: () => Promise<HistoryItem[]>, show: boolean, onClose: () => void }) {

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(show);
    if (!show) return;
    setLoading(true);
    getHistory().then(h => {
      setHistory(h);
      setLoading(false);
    })

  }, [show, getHistory]);

  return (
    <div className={twMerge("bg-transparent absolute bottom-0 h-screen w-full z-30 transition-[max-width] duration-300 flex overflow-hidden max-w-[0px] backdrop-blur-sm", show && "max-w-full")}>
      <div className="w-[80%] sm:w-[70%] md:w-[50%] max-w-[400px] h-full bg-primary flex flex-col py-4 shadow-2xl overflow-hidden">
        <h2 className="text-3xl my-2 text-white shadow-lg pb-4 pl-2">HISTORIAL</h2>
        <ul className="text-2xl w-full font-semibold h-full overflow-y-auto overflow-x-hidden
        ">
          {
            history.map(i => (
              <li
                key={i.created_at.getTime()}
                className={twMerge("p-2 mx-4 pl-4 border-l-[3px] flex justify-between items-end", i.value >= 0 ? "text-good" : "text-danger", i.value >= 0 ? "border-good" : "border-danger")}>
                <p>{priceF.format(i.value)}
                </p>
                <p className="text-md text-white">{i.created_at.getDate()}/{i.created_at.getMonth()}</p>
              </li>))
          }
        </ul>
      </div>
      <div className="grow bg-transparent h-full" onClick={onClose}></div>
    </div>
  );

}