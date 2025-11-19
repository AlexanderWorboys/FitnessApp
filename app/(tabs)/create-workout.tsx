import { TouchableOpacity, View } from "react-native";
import { useWorkoutStore } from "../../src/store/workoutStore"
import { Button, Text, ThemedView, ThemeToggle } from "../../src/components/atoms";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSheetStore } from "../../src/store/sheetStore";
import { Workout } from "../../src/components/templates/Workout";

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
        <ThemedView className="pt-20 flex-1">
            
            <Text varient="title">CreateWorkout</Text>
            <View className="flex-1 items-center justify-center">
                <Button label="Start New Workout" onPress={handleStart} />
            </View>

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
