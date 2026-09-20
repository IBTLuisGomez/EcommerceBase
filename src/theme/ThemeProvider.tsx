import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeConfig, defaultTheme } from "./types";

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: ThemeConfig;
}> = ({ children, initialTheme = defaultTheme }) => {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primaryColor);
    root.style.setProperty("--color-secondary", theme.secondaryColor);
    root.style.setProperty("--color-accent", theme.accentColor);
    root.style.setProperty("--color-bg", theme.backgroundColor);
    root.style.setProperty("--color-text", theme.textColor);
    root.style.setProperty("--font-family", theme.fontFamily);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};