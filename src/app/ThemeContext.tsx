"use client";

import { useThemeContext } from "@/hook/useTheme";
import { type ReactNode, createContext, useContext } from "react";

type ReturnThemeContext = {
  switchDarkMode: () => void;
  dark: boolean;
};

export const themeContext = createContext<ReturnThemeContext>(
  {} as ReturnThemeContext
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const context = useThemeContext();

  return (
    <themeContext.Provider value={context}>
      {children}
    </themeContext.Provider>
  );
}
