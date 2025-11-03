

import { ThemeToggle } from "../../src/components/atoms/ThemeToggle";
import { useThemeStore } from "../../src/store/themeStore";
import { ThemedView } from "../../src/components/atoms/ThemedView";
import { Text } from "../../src/components/atoms/Text";
import { Input } from "../../src/components/atoms/Input";
import { Icon } from "../../src/components/atoms/Icon";
import { Row } from "../../src/components/atoms/Row";
import { Button, Pressable } from "react-native";
import { TableHeader } from "../../src/components/molecules/TableHeader";
import { useState } from "react";
import Table from "../../src/components/organisms/Table";
import { weightColumns } from "../../src/utils/TestData";
import ExercisePanel from "../../src/components/organisms/ExercisePanel";


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
            <Icon name="fitness" lightColorClass="text-green-500" darkColorClass="text-green-400" size={42} />
            <Icon name="settings" size={28} className="text-blue-500" />
            <Icon name="warning" size={28} />
            <ThemeToggle />

            <ExercisePanel />

        </ThemedView>
    );
}


export default Index;