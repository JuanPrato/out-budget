import { themeContext } from "@/app/ThemeContext";
import { useContext, useState } from "react";

export function useThemeContext() {
  const [dark, setDark] = useState(true);

  function switchDarkMode() {
    setDark((d) => !d);
  }

  return { switchDarkMode, dark };
}

export function useTheme() {
  return useContext(themeContext);
}
