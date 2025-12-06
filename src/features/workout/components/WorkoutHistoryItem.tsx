import React, { memo } from "react";
import { Workout } from "../../../types/workout";
import { formatDate } from "../../../utils/formatDate";
import { Alert, View } from "react-native";
import { useWorkoutStore } from "../../../store/workout/useWorkoutStore";
import PressableCard from "../../../components/molecules/PressableCard";
import { ListItem } from "../../../components/molecules/ListItem";
import { Button, Text } from "../../../components/atoms";

interface Props {
    workout: Workout
}

const WorkoutHistoryItem = memo(({ workout }: Props) => {
    const deleteWorkout = useWorkoutStore((s) => s.deleteWorkout);

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete workout?",
            "This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteWorkout(id) }
            ]
        );
    };

    return (
        <PressableCard className="mb-4 p-4 rounded-2xl" onPress={() => console.log(workout.id)}>
            <ListItem title={workout.name} subtext={formatDate(workout.startTime)} />
            <Button label="delete" variant="danger" onPress={() => handleDelete(workout.id)} />
            {workout.exercises.map((ex, index) => (
                <View key={`${workout.id}-${index}`}>
                    <Text>{index}. {ex.name} | {ex.type}</Text>
                    {ex.sets.map((set, setIndex) => (
                        <View key={`${workout.id}-${index}-${setIndex}`}>
                            {ex.type === "weight" && <Text>set {setIndex}. {set.kg} x {set.reps}</Text>}
                            {ex.type === "timed" && <Text>set {setIndex}. {set.km} in {set.time}</Text>}
                        </View>
                    ))}
                </View>
            ))}
        </PressableCard>
    )
})

export default WorkoutHistoryItem;