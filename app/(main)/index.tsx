

import { ThemeToggle } from "../../src/components/atoms/ThemeToggle";
import { useThemeStore } from "../../src/store/themeStore";
import { ThemedView } from "../../src/components/atoms/ThemedView";
import { Text } from "../../src/components/atoms/Text";
import { Input } from "../../src/components/atoms/Input";


const Index = () => {
    const { theme } = useThemeStore();
    return (
        <ThemedView className="p-4 rounded-2xl pt-20 flex-1">
            <Text varient="header">
                Welcome to Expo Router
            </Text>
            <Text varient="subheader">This is getting exciting!</Text>
            <Text>This is getting exciting!</Text>
            <Text varient="muted">This is getting exciting!</Text>

            <Input className="rounded-md" placeholder="input here" />
            <Input className="rounded-full shadow mt-4" placeholder="Something went wrong" state="error" />
            <ThemeToggle />
        </ThemedView>
    );
}


export default Index;