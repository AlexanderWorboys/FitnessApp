import { TouchableOpacity, View } from "react-native";
import { Button, ThemedView, ThemeToggle } from "../../src/components/atoms";
import { Divider } from "../../src/components/atoms/Divider";
import OptionsMenu from "../../src/components/molecules/OptionsMenu";
import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { startSyncListener } from "../../src/store/sync/startSyncListener";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const [menuVisible, setMenuVisible] = useState(false);
    const iconRef = useRef(null);

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("authToken");
    }

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

            <Button label="Sync" onPress={() => startSyncListener()} />
            <Button label="logout" onPress={() => handleLogOut()} />
        </ThemedView>
    )
}