import { useThemeStore } from "../../store/ui/themeStore";
import { Text } from "../../components/atoms/Text";
import { Row } from "../atoms/Row";
import { Icon } from "../atoms/Icon";
import { Ionicons } from "@expo/vector-icons";


interface TableColumn {
    key: string;
    label: string;
    width?: string; // e.g. "w-16", "1/4"??
    align?: "left" | "center" | "right";
    type?: "text" | "input" | "icon";
}

interface TableHeaderProps {
    columns: TableColumn[];
    lightClassName?: string;
    darkClassName?: string;
    className?: string;
}


export const TableHeader = ({
    columns,
    lightClassName = "bg-muted-light border-border-light",
    darkClassName = "bg-muted-dark border-border-dark",
    className = "",
}: TableHeaderProps) => {
    const { theme } = useThemeStore();

    const themedClass =
        theme === "dark"
            ? `${darkClassName} `
            : `${lightClassName} `;

    return (
        <Row
            lightClassName={lightClassName}
            darkClassName={darkClassName}
            className={`border-b-2 py-4 ${themedClass} ${className}`}
        >
            {columns.map((column) => {
                if (column.type === "icon") {
                    return (
                        <Icon 
                            key={column.key} 
                            name={column.label as keyof typeof Ionicons.glyphMap} 
                            className={`${column.width || "flex-1"}
                                ${column.align === "center"
                                    ? "text-center"
                                    : column.align === "right"
                                        ? "text-right"
                                        : "text-left"
                                }`
                            } 
                        />
                    )
                }
                return (
                    <Text
                        key={column.key}
                        className={`${column.width || "flex-1"}
                    font-semibold text-sm uppercase ${column.align === "center"
                                ? "text-center"
                                : column.align === "right"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                    >
                        {column.label}
                    </Text>
                )
            })}

        </Row>
    )
}