import { View } from "react-native";
import { ThemedView } from "../../src/components/atoms";
import TabBar from "../../src/components/navigation/Tabs";
import { GlobalBottomSheet } from "../../src/components/organisms/BottomSheet";
import { PortalProvider } from "@gorhom/portal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UserAppProvider } from "../../src/boot/UserAppProvider";

export default function TabsLayout() {
  return (
    <BottomSheetModalProvider>
      <PortalProvider>
        <UserAppProvider>
            <TabBar />
            <GlobalBottomSheet />
        </UserAppProvider>
      </PortalProvider>
    </BottomSheetModalProvider>
  );
}
