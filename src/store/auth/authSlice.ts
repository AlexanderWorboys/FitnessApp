import { StateCreator } from "zustand";
import * as SecureStore from "expo-secure-store";

export interface AuthSlice {
  user: any;
  isAuthenticated: boolean;
  hydrated: boolean;

  setUser: (user: any) => void;
  setHydrated: (value: boolean) => void;
  logout: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  hydrated: false,

  setUser: (user: any) => {
    set({ user, isAuthenticated: !!user });
  },

  setHydrated: (value) => set({ hydrated: value }),

  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    set({
      user: null,
      isAuthenticated: false,
    });
  },
});
