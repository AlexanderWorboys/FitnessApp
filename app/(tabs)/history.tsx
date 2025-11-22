import { FlatList, View } from "react-native";
import { Card, ThemedView } from "../../src/components/atoms";
import { ListItem } from "../../src/components/molecules/ListItem";
import { Text } from "../../src/components/atoms";
import { formatDate } from "../../src/utils/formatDate";
import { useWorkoutStore } from "../../src/store/workout/useWorkoutStore";

export default function HistoryScreen() {
  const workoutHistory = useWorkoutStore((s) => s.workoutHistory);

  return (
    <ThemedView className=" rounded-2xl pt-20 flex-1 px-4">
      <Text varient="title" className="text-lg font-semibold mb-4">Workout History</Text>

      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4">
            <ListItem title={item.name} subtext={formatDate(item.startTime)} />
            {item.exercises.map((ex, index) => (
              <View key={`exercise=${item.id}-${index}`}>
                <Text>{index}. {ex.name} | {ex.type}</Text>
                {ex.sets.map((set, setIndex) => (
                  <View key={`exercise=${item.id}-${index}-${setIndex}`}>
                    {ex.type == "weight" && <Text>set {setIndex}. {set.kg} x {set.reps}</Text>}
                    {ex.type == "timed" && <Text>set {setIndex}. {set.km} in {set.time}</Text>}
                    
                  </View>
                ))}
              </View>
                
            ))}
          </View>
        )}
      />
    </ThemedView>
  );
}
