import { View } from "react-native";
import { Workout } from "../../types/workout";
import { Text } from "../atoms/Text";
import { useThemeStore } from "../../store/themeStore";


interface WorkoutSummaryProps {
    workout: Workout;
}

export const WorkoutSummary = ({ workout }: WorkoutSummaryProps) => {
    const { theme } = useThemeStore();

    return (
        <View
            className={`rounded-2xl p-4 mb-4 ${theme === "dark" ? "bg-muted-dark" : "bg-muted-light"}`}>
            <Text className="text-lg font-inter-bold text-center mb-2">
                {workout.name}
            </Text>
            <Text varient="muted" className="text-center">
                Started: {new Date(workout.startTime).toLocaleTimeString()}
            </Text>
        </View>
    )
}