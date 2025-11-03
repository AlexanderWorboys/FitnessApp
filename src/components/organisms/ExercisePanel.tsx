import { useState } from "react";
import { weightColumns } from "../../utils/TestData";
import Table from "./Table";
import { Button } from "react-native";


const ExercisePanel = () => {

    const [tableData, setTableData] = useState([
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
        <Table
            columns={weightColumns}
            data={tableData}
            onChange={setTableData}
            onTrailing={handleDelete}
            //onLeading={handleEdit}
            footer={<Button title="Add Set" onPress={addSet} />}
        />
    );
}

export default ExercisePanel;