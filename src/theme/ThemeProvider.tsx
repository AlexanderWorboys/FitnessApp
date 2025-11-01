import { View } from "react-native";
import { useThemeStore } from "../store/themeStore";
import { PropsWithChildren, useEffect } from "react";
import { Appearance } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";
import { useColorScheme } from "react-native";

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { theme, setTheme } = useThemeStore();
  const systemTheme = useColorScheme();

  // Sync system theme only on mount
  useEffect(() => {
    setTheme(systemTheme || "light");
  }, [systemTheme]);

  useEffect(() => {
    setStatusBarStyle(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return <>{children}</>

};
