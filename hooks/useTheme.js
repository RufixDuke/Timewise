// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = async () => {
    setIsDarkMode((prevMode) => !prevMode);
    try {
      await AsyncStorage.setItem("theme", JSON.stringify(!isDarkMode));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme !== null) {
          setIsDarkMode(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };

    loadThemePreference();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
