import { View } from "react-native";
import { Workout } from "../../types/workout";
import { Text } from "../atoms/Text";
import { useThemeStore } from "../../store/themeStore";
import Timer from "../molecules/Timer";
import { Button, Icon, Input } from "../atoms";
import { useCallback } from "react";
import { useWorkoutStore } from "../../store/WorkoutStore";
import { useSheetStore } from "../../store/sheetStore";
import { UserCard } from "../molecules/userCard";
import { Divider } from "../atoms/Divider";


interface WorkoutSummaryProps {
    workout: Workout;
}

export const WorkoutSummary = ({ workout }: WorkoutSummaryProps) => {
    const { theme } = useThemeStore();
    const { completeWorkout } = useWorkoutStore();
    const { closeSheet } = useSheetStore();

    const handleComplete = useCallback(async () => {
                await completeWorkout()
                closeSheet()
        }, [completeWorkout])

    return (
        <>
            <View className="flex-1 flex-row mt-8 justify-between mb-4">
                <Timer startTime={workout.startTime} />
                <View className="flex-row items-center gap-2">
                    <Icon name="timer" size={32} />
                    <Button label="Finish" onPress={handleComplete} />
                </View>
            </View>
            <UserCard className="mb-4"/>
            <Input value={workout.name} variant="invisible" className="text-3xl" />
            <Input placeholder="notes..." variant="invisible"/>
            <Divider marginY="my-4"/>
        </>
    )
}
// <View
//     className={`rounded-2xl p-4 mb-4 ${theme === "dark" ? "bg-muted-dark" : "bg-muted-light"}`}>
//     <Text className="text-lg font-inter-bold text-center mb-2">
//         {workout.name}
//     </Text>
//     <Text varient="muted" className="text-center">
//         Started: {new Date(workout.startTime).toLocaleTimeString()}
//     </Text>
//     <Timer startTime={workout.startTime} />
// </View>