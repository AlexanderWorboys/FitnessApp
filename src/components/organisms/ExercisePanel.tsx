import { useState } from "react";
import { weightColumns } from "../../data/tableColumns/weightColumns"
import Table from "./Table";
import { Button, View } from "react-native";
import { Icon, Text, Row, Card, Input } from "../atoms";
import { WorkoutExercise } from "../../types/workout"
import { TableColumn } from "../molecules/TableRow";
import { createEmptySet } from "../../data/tableColumns";
import { formatPreviousSet } from "../../utils/findPreviousExerciseSets";
import OptionsMenu from "../molecules/OptionsMenu";
import { useWorkoutStore } from "../../store/workout/useWorkoutStore";

interface ExerciseSectionProps {
    exercise: WorkoutExercise;
}

const ExercisePanel = ({ exercise }: ExerciseSectionProps) => {
    const { updateExercise, deleteExercise } = useWorkoutStore();

    const handleRowChange = (updatedSets: any[]) => {
        updateExercise(exercise.id, { ...exercise, sets: updatedSets })
    }

    // To review, checking for previous then formating previous
    const formattedRows = exercise.sets.map((set, index) => {
        const previous = exercise.previous?.[index];

        return {
            set: set.setNumber,
            previous: previous
                ? formatPreviousSet(previous, exercise.type)
                : "-",
            kg: set.kg ?? "",
            reps: set.reps ?? "",
            complete: set.complete
        };
    });


    const handleAddSet = () => {
        const newSet = createEmptySet(
            exercise.type,
            exercise.sets.length + 1
        )
        handleRowChange([...exercise.sets, newSet])
    }

    const handleDeleteSet = (index: number) => {
        //setTableData((prev) => prev.filter((_, i) => i !== index))
        console.log(index)
    }

    const handleEdit = (index: number) => {
        console.log("Edit row:", index)
    }

    const handleDeleteExercise = () => {
        deleteExercise(exercise.id);
    }

    return (
        <Card className="pt-4 mt-4 rounded-3xl">
            <View className="px-4 mb-2">
                <View className="flex-row justify-between items-center">
                    <Text varient="subheader" className="flex-1">{exercise.name}</Text>
                    <OptionsMenu
                        iconSize={28}
                        preset="exercise"
                        actions={{ delete: handleDeleteExercise}}
                    />
                </View>
                <Input variant="invisible" placeholder="Notes..." className="my-2"/>
            </View>
            <Table
                columns={exercise.columns as TableColumn[]}
                //data={formattedRows} //This breaks the complete check, needs reviewing
                data={exercise.sets}
                onChange={handleRowChange}
                onTrailing={handleDeleteSet}
                //onLeading={handleEdit}
                className="rounded-b-3xl"
                footer={<Button title="Add Set" onPress={handleAddSet} />}
            />
        </Card>
    );
}

export default ExercisePanel;