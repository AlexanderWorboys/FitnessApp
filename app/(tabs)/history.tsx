import { View, Text } from "react-native";
import { ThemedView } from "../../src/components/atoms";

export default function HistoryScreen() {
  return (
    <ThemedView className=" rounded-2xl pt-20 flex-1">
      <Text className="text-lg font-semibold">Workout History</Text>
    </ThemedView>
  );
}
