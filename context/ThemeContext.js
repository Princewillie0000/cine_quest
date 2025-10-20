import React, { createContext, useContext, useState, useMemo } from "react";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === "dark" ? "dark" : "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const paperTheme = useMemo(
    () => (theme === "dark" ? DarkTheme : DefaultTheme),
    [theme]
  );

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export default useTheme = () => useContext(ThemeContext);
// export const useTheme = () => useContext(ThemeContext);
