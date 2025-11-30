import { TouchableOpacity, View } from "react-native";
import { Button, Card, Text, ThemedView, ThemeToggle } from "../../src/components/atoms";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSheetStore } from "../../src/store/ui/sheetStore";
import { Workout } from "../../src/components/templates/Workout";
import { useWorkoutStore } from "../../src/store/workout/useWorkoutStore";
import { UserCard } from "../../src/components/molecules/userCard";
import { ChipGroup } from "../../src/components/molecules/ChipGroup";

export default function CreateWorkoutScreen() {
    const sheetRef = useRef<any>(null)
    const { startWorkout, templates } = useWorkoutStore();
    const { openSheet } = useSheetStore()

    const handleStart = () => {
        startWorkout("New Workout")
        openSheet(<Workout />)
    }


    const handleTemplateStart = (template: any) => {
        startWorkout(template)
        openSheet(<Text>Test</Text>)
    }



    return (
        <ThemedView className="pt-20 flex-1 px-4">

            <Text varient="title" className="mb-4 font-inter-semibold">Start a Workout</Text>
            <Card className="p-2 rounded-xl mb-4" lightClassName="bg-primary">
                <UserCard username="John Doe" isVerified verification="Qualified Personal Trainer" />
                <Card className="p-2 rounded-lg mt-3"  darkClassName="bg-primary">
                    <Text varient="subheader">Back & Biceps</Text>
                    <ChipGroup
                        items={["60 - 90 Mins", "Back", "Beginner"]}
                        className="mt-2"
                    />
                </Card>
            </Card>

            <Button textClassName="text-lg" iconSize={30} leftIcon="add-circle-outline" label="Start New Workout" onPress={handleStart} className="mb-4" />

            <Text varient="title">Templates</Text>
            <ScrollView>
                {templates.map((t) => (
                    <TouchableOpacity
                        key={t.id}
                        onPress={() => handleTemplateStart(t)}
                        className="border rounded-xl p-3 mb-2"
                    >
                        <Text className="font-semibold">{t.name}</Text>
                        {t.description && (
                            <Text className="text-gray-500 text-xs">{t.description}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>


        </ThemedView>

    );
}
