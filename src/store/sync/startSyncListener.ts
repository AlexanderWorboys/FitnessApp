import NetInfo from "@react-native-community/netinfo";
import { useSyncStore } from "./syncSlice";

export function startSyncListener() {
  const sync = useSyncStore.getState();

  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      sync.processQueue();
    }
  });

  // Process once on app load
  setTimeout(() => sync.processQueue(), 1500);
}
