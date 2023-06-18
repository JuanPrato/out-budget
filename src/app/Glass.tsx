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

  if (percentage <= BG_PERCETAGES.DEAD) {
    bg = BGS[BG_PERCETAGES.DEAD];
  } else if (percentage <= BG_PERCETAGES.DANGER) {
    bg = BGS[BG_PERCETAGES.DANGER];
  } else if (percentage <= BG_PERCETAGES.WARNING) {
    bg = BGS[BG_PERCETAGES.WARNING];
  } else {
    bg = BGS[BG_PERCETAGES.GOOD];
  }

  return `before:bottom-[${percentage}%] after:bottom-[${percentage}%] bg-${bg}`

}

export default function Glass({ percentage, current }: { percentage: number, current: number }) {

  return (
    <div className={twMerge('w-[95%] aspect-square mx-auto rounded-full bg-glass border-[15px] border-borderGlass overflow-hidden glassShadow flex flex-col justify-end')}>
      <div className={twMerge('h-[150%] water bg-good before:bg-glassBack before:bg-opacity-30 after:bg-glassBack', getBudgetClasses(percentage))} >
        <h3 className='z-10 text-5xl text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 drop-shadow-xl' > {f.format(current)}</h3>
      </div >
    </div >
  )
}
