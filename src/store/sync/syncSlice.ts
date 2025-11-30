import { create } from "zustand";
import { SyncAction } from "./types";
import { processSyncAction } from "./queueProcessor";


type SyncStore = {
  queue: SyncAction[];
  addToQueue: (action: SyncAction) => void;
  removeFromQueue: (id: string) => void;
  processQueue: () => Promise<void>;
};

export const useSyncStore = create<SyncStore>((set, get) => ({
  queue: [],

  addToQueue: (action: SyncAction) =>
    set((state) => ({ queue: [...state.queue, action] })),

  removeFromQueue: (id: string) =>
    set((state) => ({ queue: state.queue.filter(a => a.id !== id) })),

  processQueue: async () => {
    const { queue, removeFromQueue } = get();
    //console.log("starting sync process... ", queue) // Use for testing sync data

    for (const action of queue) {
      try {
        await processSyncAction(action);  
        removeFromQueue(action.id);
      } catch (err) {
        console.log("Still offline, leaving in queue.");
        return; // stop processing until next retry
      }
    }
  },
}));