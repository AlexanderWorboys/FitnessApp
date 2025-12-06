import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthSlice, AuthSlice } from "./authSlice";

export const useAuthStore = create<AuthSlice>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);
