import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, Text, ThemedView } from "../../src/components/atoms";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
 const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);

  const handleOpen = () => {
    bottomSheetRef.current?.snapToIndex(1); // Full screen
  };

  const handleCollapse = () => {
    bottomSheetRef.current?.close() // Collapse to 10%
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
  <Button label="Open This modal dasdasda" onPress={handleOpen} />
  <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={false} backdropComponent={() => null}>
    <BottomSheetView className="flex-1 p-5 h-full">
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Modal content</Text>
      <Button label="close Modal" onPress={handleCollapse} />
    </View>
    </BottomSheetView>
  </BottomSheet>
</SafeAreaView>

  );
}
