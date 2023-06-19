"use client";

import { ReturnSessionContext, useSessionContext } from "@/hook/useSession";
import { createContext, type ReactNode } from "react";

export const sessionContext = createContext<ReturnSessionContext>({} as ReturnSessionContext);

export default function Context({ children }: { children: ReactNode }) {

  const context = useSessionContext();

  return (
    <sessionContext.Provider value={context}>
      {children}
    </sessionContext.Provider>
  )

}