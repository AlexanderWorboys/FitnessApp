// src/store/uiStore.ts
import { create } from "zustand"

interface UIState {
  hideTabBar: boolean
  setHideTabBar: (hidden: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  hideTabBar: false,
  setHideTabBar: (hidden) => set({ hideTabBar: hidden }),
}))
