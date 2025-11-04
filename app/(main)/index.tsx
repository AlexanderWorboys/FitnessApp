

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
import { Card } from "../../src/components/atoms/Card";
import { ScrollView } from "react-native-gesture-handler";
import { Workout } from "../../src/components/templates/Workout";


const Index = () => {
    const { theme } = useThemeStore();

    return (
        <ThemedView className=" rounded-2xl pt-20 flex-1">
            {/* <ScrollView className="p-4" showsVerticalScrollIndicator={false}> */}
            
            <ThemeToggle />
            <Workout />

            {/* </ScrollView> */}
        </ThemedView>
    );
}


export default Index;