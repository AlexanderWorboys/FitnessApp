import { useCallback } from "react";
import { useSheetStore } from "../../../store/ui/sheetStore";
import { useThemeStore } from "../../../store/ui/themeStore";
import { useWorkoutStore } from "../../../store/workout/useWorkoutStore";
import { Workout } from "../../../types/workout";
import { View } from "react-native";
import TimerDisplay from "../../../components/molecules/Timer";
import { Button, Icon, Input } from "../../../components/atoms";
import { UserCard } from "../../../components/molecules/userCard";
import { ChipGroup } from "../../../components/molecules/ChipGroup";
import { Divider } from "../../../components/atoms/Divider";



interface WorkoutSummaryProps {
    workout: Workout;
    elapsed: number;
}

export const WorkoutSummary = ({ workout, elapsed }: WorkoutSummaryProps) => {
    const { theme } = useThemeStore();
    const { completeWorkout, updateWorkoutName } = useWorkoutStore();
    const { closeSheet } = useSheetStore();

    const handleComplete = useCallback(async () => {
        await completeWorkout()
        closeSheet()
    }, [completeWorkout])

    return (
        <>
            <View className="flex-1 flex-row  justify-between mb-4">
                <TimerDisplay elapsed={elapsed} />
                <View className="flex-row items-center gap-2">
                    <Icon name="timer" size={32} />
                    <Button label="Finish" onPress={handleComplete} />
                </View>
            </View>
            <UserCard username="Alex Worboys" isVerified={true} className="mb-4" />
            <Input value={workout.name} onChangeText={(e) => updateWorkoutName(workout.id, e)} variant="invisible" className="text-3xl" />
            <ChipGroup items={["60 - 90 Mins", "Chest"]} className="mt-4" />
            <Input placeholder="notes..." variant="invisible" className="mt-4" />
            <Divider marginY="my-4" />
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