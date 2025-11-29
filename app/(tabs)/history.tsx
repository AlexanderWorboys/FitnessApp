import { FlatList, View } from "react-native";
import { Card, ThemedView } from "../../src/components/atoms";
import { ListItem } from "../../src/components/molecules/ListItem";
import { Text } from "../../src/components/atoms";
import { formatDate } from "../../src/utils/formatDate";
import { useWorkoutStore } from "../../src/store/workout/useWorkoutStore";
import WorkoutHistoryItem from "../../src/components/organisms/Workouts/WorkoutHistoryItem";

export default function HistoryScreen() {
  const workoutHistory = useWorkoutStore((s) => s.workoutHistory);

  return (
    <ThemedView className=" rounded-2xl pt-20 flex-1 px-4">
      <Text varient="title" className="text-lg font-semibold mb-4">Workout History</Text>

      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutHistoryItem workout={item} />
        )}
      />
    </ThemedView>
  );
}
