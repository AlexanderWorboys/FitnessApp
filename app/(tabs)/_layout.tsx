import { View } from "react-native";
import { ThemedView } from "../../src/components/atoms";
import TabBar from "../../src/components/navigation/Tabs";
import { WorkoutSheet } from "../../src/components/templates/WorkoutSheet";

export default function TabsLayout() {
  return (
    <View className="flex-1">
      <TabBar />
      <WorkoutSheet />
    </View>
  );
}
