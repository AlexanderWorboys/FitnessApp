

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
import { weightColumns, cadioColumns } from "../../src/utils/TestData";


const Index = () => {
    const { theme } = useThemeStore();

    

    const [tableData, setTableData] = useState([
        { set: 1, previous: "40 x 10", kg: "40", reps: "10", done: true },
        { set: 2, previous: "60 x 10", kg: "60", reps: "10", done: false },
    ])

    const [cadioData, setCadioData] = useState([
        { set: 1, previous: "40 x 10", kg: "40", reps: "10", done: true },
        { set: 2, previous: "60 x 10", kg: "60", reps: "10", done: false },
    ])

    const handleRowChange = (rowIndex: number, key: string, value: any) => {
        setTableData((prev) => {
            const newData = [...prev]
            newData[rowIndex] = { ...newData[rowIndex], [key]: value }
            return newData
        })
    }

    const addSet = () => {
        setTableData((prev) => [
            ...prev,
            {
                set: prev.length + 1,
                previous: "-",
                kg: "",
                reps: "",
                done: false,
            },
        ])
    }

    const handleDelete = (index: number) => {
        setTableData((prev) => prev.filter((_, i) => i !== index))
    }

    const handleEdit = (index: number) => {
        console.log("Edit row:", index)
    }

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

            

            <Table
                columns={weightColumns}
                data={tableData}
                onChange={setTableData}
                onTrailing={handleDelete}
                //onLeading={handleEdit}
                footer={ <Button title="Add Set" onPress={addSet} /> }
            />

            <Table
                columns={cadioColumns}
                data={cadioData}
                onChange={setTableData}
                onTrailing={handleDelete}
                //onLeading={handleEdit}
                footer={ <Button title="Add Set" onPress={addSet} /> }
            />

        </ThemedView>
    );
}


export default Index;