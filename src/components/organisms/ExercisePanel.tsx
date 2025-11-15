import { useState } from "react";
import { weightColumns } from "../../data/tableColumns/weightColumns"
import Table from "./Table";
import { Button, View } from "react-native";
import { Icon, Text, Row, Card, Input } from "../atoms";
import { WorkoutExercise } from "../../types/workout"
import { useWorkoutStore } from "../../store/workoutStore";
import { TableColumn } from "../molecules/TableRow";

interface ExerciseSectionProps {
    exercise: WorkoutExercise;
}

const ExercisePanel = ({ exercise }: ExerciseSectionProps) => {
    const { updateExercise } = useWorkoutStore();

    const handleRowChange = (updatedSets: any[]) => {
        updateExercise(exercise.id, { ...exercise, sets: updatedSets })
    }

    const handleAddSet = () => {
        const newSet = {
            id: Date.now().toString(),
            setNumber: exercise.sets.length + 1,
            kg: 0,
            reps: 0,
            completed: false,
        }
        handleRowChange([...exercise.sets, newSet])
    }

    // const handleDelete = (index: number) => {
    //     setTableData((prev) => prev.filter((_, i) => i !== index))
    // }

    // const handleEdit = (index: number) => {
    //     console.log("Edit row:", index)
    // }

    return (
        <Card className="pt-4 mt-4 rounded-3xl">
            <View className="px-4 mb-2">
                <View className="flex-row justify-between items-center">
                    <Text varient="subheader" className="flex-1">{exercise.name}</Text>
                    <Icon name="ellipsis-horizontal-circle-outline" size={28} />
                </View>
                <Input variant="invisible" placeholder="Notes..." />
            </View>
            <Table
                columns={weightColumns as TableColumn[]}
                data={exercise.sets}
                onChange={handleRowChange}
                //onTrailing={handleDelete}
                //onLeading={handleEdit}
                className="rounded-b-3xl"
                footer={<Button title="Add Set" onPress={handleAddSet} />}
            />
        </Card>
    );
}

export default ExercisePanel;