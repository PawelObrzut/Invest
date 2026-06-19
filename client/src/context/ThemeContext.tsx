import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../theme/darkTheme";

type ThemeMode = "dark" | "light" | "ocean";

type ThemeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside provider");
  return ctx;
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("theme") as ThemeMode) || "dark";
  });

  const theme = useMemo(() => {
    // todo: add ternary or switch to return apropriate mode
    // e.g. return mode === "dark" ? darkTheme : lightTheme;
    return darkTheme;
  }, [mode]);

  const value = useMemo(() => ({
    mode,
    setMode: (m: ThemeMode) => {
      setMode(m);
      localStorage.setItem("theme", m);
    }
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};