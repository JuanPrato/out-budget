import { randomBytes } from "crypto";
import { twMerge } from "tailwind-merge";

const f = Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });

enum BG_PERCETAGES {
  DEAD = 10,
  DANGER = 20,
  WARNING = 60,
  GOOD = 100
}

const BGS = {
  [BG_PERCETAGES.GOOD]: "good",
  [BG_PERCETAGES.WARNING]: "warning",
  [BG_PERCETAGES.DANGER]: "danger",
  [BG_PERCETAGES.DEAD]: "dead"
}

function getBudgetClasses(percentage: number) {

  let bg: string;
  const aux = Math.ceil(percentage / 10) * 10;
  const showP: number = aux < 0 ? 100 : aux;

  if (percentage <= BG_PERCETAGES.DEAD) {
    bg = BGS[BG_PERCETAGES.DEAD];
  } else if (percentage <= BG_PERCETAGES.DANGER) {
    bg = BGS[BG_PERCETAGES.DANGER];
  } else if (percentage <= BG_PERCETAGES.WARNING) {
    bg = BGS[BG_PERCETAGES.WARNING];
  } else {
    bg = BGS[BG_PERCETAGES.GOOD];
  }

  return `before:bottom-[${showP}%] after:bottom-[${showP}%] bg-${bg}`

}

export default function Glass({ percentage, current, spend }: { percentage: number, current: number, spend: number | undefined }) {

  return (
    <div className='w-[95%] aspect-square mx-auto rounded-full bg-glass border-[15px] border-borderGlass  overflow-hidden glassShadow flex flex-col justify-end'>
      <div className={twMerge('h-[150%] water before:bg-glassBack before:bg-opacity-30 after:bg-glassBack', getBudgetClasses(percentage))}>
        <h3 className={twMerge('z-10 text-5xl font-bold text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 drop-shadow-xl', current < 0 && "text-red-600")} >{f.format(current)}</h3>
      </div>
      {
        spend !== undefined &&
        <p
          className={twMerge("absolute text-3xl font-semibold top-1/2 left-1/2 z-20 spend", spend <= 0 ? "text-green-700" : "text-red-600")}
          key={randomBytes(32).toString()}>{spend * -1 >= 0 ? "" : "-"}{f.format(Math.abs(spend))}
        </p>
      }
    </div>
  )
}
