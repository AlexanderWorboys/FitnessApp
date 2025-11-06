import { View, Text } from "react-native";
import { useWorkoutStore } from "../../src/store/WorkoutStore"
import { Button, ThemedView, ThemeToggle } from "../../src/components/atoms";

export default function CreateWorkoutScreen() {
    const { startWorkout } = useWorkoutStore();

    return (
        <ThemedView className="pt-20 flex-1">
            {/* <ScrollView className="p-4" showsVerticalScrollIndicator={false}> */}

            <ThemeToggle />
            <View className="flex-1 items-center justify-center">
                <Button label="Start New Workout" onPress={() => startWorkout("My Workout")} />
            </View>

            {/* </ScrollView> */}
        </ThemedView>

    );
}
