import { create } from "zustand";
import { Appearance } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: Appearance.getColorScheme() || "light",
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    set({ theme: next });
  },
  setTheme: (mode) => set({ theme: mode }),
}));
