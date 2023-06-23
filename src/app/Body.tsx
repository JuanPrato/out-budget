"use client";

import SessionProvider from "@/firebase/Context";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Comfortaa } from 'next/font/google'
import { useTheme } from "@/hook/useTheme";

const comfortaa = Comfortaa({ subsets: ['latin'], preload: true });

export default function Body({ children }: { children: ReactNode }) {

  const { dark } = useTheme();

  return (
    <body className={twMerge(comfortaa.className, "h-screen w-screen overflow-hidden flex flex-col", dark && "dark")}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </body>
  );
}