import { View } from "react-native";
import { useThemeStore } from "../../store/themeStore";
import { TableColumn, TableRow } from "../molecules/TableRow";
import { TableHeader } from "../molecules/TableHeader";


interface TableProps {
    columns: TableColumn[];
    data: any[];
    onChange?: (newData: any[]) => void;
    footer?: React.ReactNode;
    lightHeaderColorClass?: string;
    darkHeaderColorClass?: string;
    lightRowColorClass?: string;
    darkRowColorClass?: string;
    className?: string;
}

export const Table = ({
    columns,
    data,
    onChange,
    footer,
    lightHeaderColorClass = "bg-background-light border-border-light",
    darkHeaderColorClass = "bg-background-dark border-border-dark",
    lightRowColorClass = "",
    darkRowColorClass = "",
    className = ""
}: TableProps) => {
    const  { theme }  = useThemeStore();

    const themedHeaderClass =
        theme === "dark" ? `${darkHeaderColorClass} ${className}` : `${lightHeaderColorClass} ${className}`;
    
    const themedRowClass = theme === "dark" ? darkRowColorClass : lightRowColorClass;

    const handleRowChange = (rowIndex: number, key: string, value: any) => {
        if (!onChange) return;
        const updated = [...data]
        updated[rowIndex] = { ...updated[rowIndex], [key]: value }
        onChange(updated)
    }

    return (
        <View className={`rounded-2xl overflow-hidden border ${themedHeaderClass} ${className}`} >
            <TableHeader columns={columns} />

            {data.map((row, index) => (
                <TableRow
                    key={index}
                    rowData={row}
                    columns={columns}
                    onChange={(key, val) => handleRowChange(index, key, val)}
                    lightClassName={lightRowColorClass}
                    darkClassName={darkRowColorClass}
                />
            ))}

            {footer && (
                <View className="border-t border-border-light dark:border-border-dark">
                    {footer}
                </View>
            )}
        </View>
    )
}