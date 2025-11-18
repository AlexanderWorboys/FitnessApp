import { ReactNode } from "react"
import { create } from "zustand"

// storing bottom sheet data

interface SheetStore {
  isOpen: boolean;
  content: ReactNode;
  snapPoints: string[];
  sheetIndex: number;
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
  setSheetIndex: (index: number) => void
}

export const useSheetStore = create<SheetStore>((set) => ({
  isOpen: false,
  content: null,
  snapPoints: [ '95%'],
  sheetIndex: 0,
  openSheet: (content) => set({ isOpen: true, content }),
  closeSheet: () => set({ isOpen: false, content: null }),
  setSheetIndex: (index) => set({sheetIndex: index})
}))
