import { TouchableOpacity, View } from "react-native";
import { ThemedView, ThemeToggle } from "../../src/components/atoms";
import { Divider } from "../../src/components/atoms/Divider";
import OptionsMenu from "../../src/components/molecules/OptionsMenu";
import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Profile() {
    const [menuVisible, setMenuVisible] = useState(false);
    const iconRef = useRef(null);
    return (
        <ThemedView className="justify-center align-middle flex-1 px-4">
            <ThemeToggle />
            <Divider marginY="my-10" />
            <OptionsMenu
                iconSize={30}
                preset="workout"
                actions={{
                    edit: () => console.log("edit"),
                    delete: () => console.log("delete")
                }}
            />

            <View className="flex-row">
                <View className="flex-1"></View>
                <OptionsMenu
                    iconSize={30}
                    preset="post"
                    actions={{
                    edit: () => console.log("edit"),
                    delete: () => console.log("delete")
                }}
                />
            </View>
        </ThemedView>
    )
}