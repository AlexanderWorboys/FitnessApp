import { View } from "react-native";
import { useThemeStore } from "../../store/themeStore";
import { TableColumn, TableRow } from "../molecules/TableRow";
import { TableHeader } from "../molecules/TableHeader";
import { SwipeableRow } from "../molecules/SwipableRow";


interface TableProps {
    columns: TableColumn[];
    data: any[];
    onChange?: (newData: any[]) => void;
    onTrailing?: (rowIndex: number) => void;
    onLeading?: (rowIndex: number) => void;
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
    onTrailing,
    onLeading,
    footer,
    lightHeaderColorClass = "bg-background-light border-border-light",
    darkHeaderColorClass = "bg-background-dark border-border-dark",
    //lightRowColorClass = "", // To be potentially implemented later to allow custom row colours
    //darkRowColorClass = "", // To be potentially implemented later to allow custom row colours
    className = ""
}: TableProps) => {
    const  { theme }  = useThemeStore();

    const themedHeaderClass =
        theme === "dark" ? `${darkHeaderColorClass} ${className}` : `${lightHeaderColorClass} ${className}`;
    

    const handleRowChange = (rowIndex: number, key: string, value: any) => {
        if (!onChange) return;
        const updated = [...data]
        updated[rowIndex] = { ...updated[rowIndex], [key]: value }
        onChange(updated)
    }

    return (
        <View className={`overflow-hidden border ${themedHeaderClass} ${className}`} >
            <TableHeader columns={columns} />

            {data.map((row, index) => (
                <SwipeableRow
                    key={index}
                    rowData={row}
                    columns={columns}
                    onChange={(key, val) => handleRowChange(index, key, val)}
                    swipeable={!!(onLeading || onTrailing)}
                    onLeading={onLeading ? () => onLeading(index) : undefined}
                    onTrailing={onTrailing ? () => onTrailing(index) : undefined}
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

export default Table;