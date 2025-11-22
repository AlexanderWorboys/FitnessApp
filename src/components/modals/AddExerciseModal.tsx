import { FlatList, Modal, TouchableOpacity } from "react-native";
import { useExerciseLibrary } from "../../store/exerciseLibrary";
import { Card, Input, ThemedView } from "../atoms";
import { useState } from "react";
import { ListItem } from "../molecules/ListItem";
import { Divider } from "../atoms/Divider";
import { ChipGroup } from "../molecules/ChipGroup";
import { Chip } from "../atoms/Chip";
import { useWorkoutStore } from "../../store/workout/useWorkoutStore";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function AddExerciseModal({ visible, onClose }: ModalProps) {
    const { allExercises, searchExercises } = useExerciseLibrary();
    const addExercise = useWorkoutStore((s) => s.addExercise);

    const [query, setQuery] = useState("");

    const filtered = query.trim().length > 0
        ? searchExercises(query)
        : allExercises;

    const handleSelectExercise = (exercise) => {
        addExercise(exercise);
        onClose();
    }

    return (
        <Modal transparent visible={visible} animationType="fade" className="border rounded-lg">
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                className="flex-1 bg-black/50 justify-center items-center"
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { }}
                    className="w-[85%] max-h-[70%]"
                >
                    <Card className="rounded-2xl px-2 pt-2 mb-4" >
                        <Input
                            placeholder="Search Exercises..."
                            className=" rounded-full mb-2"
                        />

                        <ChipGroup
                            items={["Type", "Machine"]}
                            className="my-4"
                        />

                        <FlatList
                            data={filtered}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <>
                                    <TouchableOpacity onPress={() => handleSelectExercise(item)}>
                                        <ListItem title={item.name} subtext={`${item.muscleGroup} | ${item.equipment}`} />
                                    </TouchableOpacity>
                                    <Divider marginY="my-1" />
                                </>
                            )}
                        />
                    </Card>
                </TouchableOpacity>

            </TouchableOpacity>

        </Modal>
    )

}