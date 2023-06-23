import { themeContext } from "@/app/ThemeContext";
import { useContext, useEffect, useState } from "react";

export function useThemeContext() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "ligth");
  }, [dark]);

  function switchDarkMode() {
    setDark((d) => !d);
  }

  return { switchDarkMode, dark };
}

export function useTheme() {
  return useContext(themeContext);
}
