

import { ThemeToggle } from "../../src/components/atoms/ThemeToggle";
import { useThemeStore } from "../../src/store/themeStore";
import { ThemedView } from "../../src/components/atoms/ThemedView";
import { Text } from "../../src/components/atoms/Text";
import { Input } from "../../src/components/atoms/Input";
import { Icon } from "../../src/components/atoms/Icon";
import { Row } from "../../src/components/atoms/Row";
import { Pressable } from "react-native";
import { TableHeader } from "../../src/components/molecules/TableHeader";
import { useState } from "react";
import { TableRow } from "../../src/components/molecules/TableRow";


const Index = () => {
    const { theme } = useThemeStore();

    const columns = [
        { key: "set", label: "Set", width: "w-10", align: "center" },
        { key: "previous", label: "Previous", width: "flex-1", align: "center" },
        { key: "kg", label: "Kg", width: "w-14", align: "center", editable: true, type: "input" },
        { key: "reps", label: "Reps", width: "w-14", align: "center", editable: true, type: "input" },
        { key: "done", label: "✔", width: "w-8", align: "center", type: "icon" },
    ]

    const [tableData, setTableData] = useState([
        { set: 1, previous: "40 × 10", kg: 40, reps: 10, done: true },
        { set: 2, previous: "60 × 10", kg: 60, reps: 10, done: false },
    ])

    const handleRowChange = (rowIndex: number, key: string, value: any) => {
    setTableData((prev) => {
        const newData = [...prev]
        newData[rowIndex] = { ...newData[rowIndex], [key]: value }
        return newData
    })
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

            <TableHeader columns={columns} />
            {tableData.map((row, i) => (
                <TableRow
                    key={i}
                    rowData={row}
                    columns={columns}
                    onChange={(key, value) => handleRowChange(i, key, value)}
                />
            ))}

            {/* <Row>
                <Text>1</Text>
                <Text>60 x 10</Text>
                <Input value="80" className="w-16 text-center" />
                <Input value="10" className="w-16 text-center" />
                <Pressable onPress={() => alert("Pressed!")}>
                    <Icon name="checkmark-circle-outline" size={32} lightColorClass="text-text-muted-light" darkColorClass="text-text-muted-dark" />
                </Pressable>
            </Row>
            <Row>
                <Text>2</Text>
                <Text>60 x 10</Text>
                <Input keyboardType="numeric" placeholder="80" className="w-16 text-center" />
                <Input value="10" className="w-16 text-center" />
                <Pressable onPress={() => alert("Pressed!")}>
                    <Icon name="checkmark-circle-outline" size={32} lightColorClass="text-text-muted-light" darkColorClass="text-text-muted-dark" />
                </Pressable>
            </Row> */}
        </ThemedView>
    );
}


export default Index;