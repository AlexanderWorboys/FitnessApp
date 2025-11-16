import { Pressable } from "react-native";
import { useThemeStore } from "../../store/themeStore";
import { Input } from "../atoms/Input";
import { Row } from "../atoms/Row";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";


export interface TableColumn {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "center" | "right";
    editable?: boolean;
    type?: "text" | "input" | "icon";
    keyboardType: "numeric" | "default"
}

interface TableRowProps {
    rowData: Record<string, any>;
    columns: TableColumn[];
    onChange?: (key: string, value: any) => void;
    lightClassName?: string;
    darkClassName?: string;
    className?: string;
}


export const TableRow = ({
    rowData,
    columns,
    onChange,
    lightClassName = "bg-background-light border-border-light",
    darkClassName = "bg-background-dark border-border-dark",
    className = "", 
}: TableRowProps) => {
    const { theme } = useThemeStore();

    const themedClass =
        theme === "dark"
            ? `${darkClassName} `
            : `${lightClassName} `;

    return (
        <Row
            lightClassName={lightClassName}
            darkClassName={darkClassName}
            className={`border-b ${themedClass} ${className}`}
        >
            {columns.map((col) => {
                const cellValue = rowData[col.key];

                // Input Cells
                if (col.type === "input" || col.editable) {
                    return (
                        <Input
                            key={col.key}
                            value={String(cellValue ?? "")}
                            onChangeText={(text) => onChange?.(col.key, text)}
                            className={`${col.width || "flex-1"} text-center py-2`}
                            keyboardType={col.keyboardType || "default"}
                        />
                    )
                }

                // Icon Cells (functional) This will need tweaking later, for more customisation
                if(col.type === "icon") {
                    return (
                        <Pressable
                            key={col.key}
                            onPress={() => onChange?.(col.key, !cellValue)}
                            className={`${col.width || "w-8"} items-center justify-center`}
                        >
                            <Icon
                                name={cellValue ? "checkmark-circle" : "checkmark-circle-outline"}
                                size={28}
                                lightColorClass="text-green-500"
                                darkColorClass="text-green-400"
                            />
                        </Pressable>
                    )
                }

                // Default Text Cells
                return (
                    <Text
                        key={col.key}
                        className={`${ col.width || "flex-1"} 
                                    ${col.align === "center"
                                        ? "text-center"
                                        : col.align === "right"
                                        ? "text-right"
                                        : "text-left"
                        }`}
                    >
                        {cellValue}
                    </Text>
                )

            })} 
        </Row>
    )
}