import React, { createContext, useContext } from "react";
import { useTheme } from "../hooks";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
