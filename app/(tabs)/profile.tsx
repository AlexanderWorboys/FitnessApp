import { View } from "react-native";
import { ThemedView, ThemeToggle } from "../../src/components/atoms";
import { Divider } from "../../src/components/atoms/Divider";
import OptionsMenu from "../../src/components/molecules/OptionsMenu";

export default function Profile() {
    return (
        <ThemedView className="justify-center align-middle flex-1 px-4">
            <ThemeToggle />
            <Divider marginY="my-10" />
            <OptionsMenu
                iconSize={30}
                preset="workout"
            />
            <View className="flex-row">
                <View className="flex-1"></View>
                <OptionsMenu
                iconSize={30}
                preset="workout"
            />
            </View>
        </ThemedView>
    )
}