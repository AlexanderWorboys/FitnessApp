import { useThemeStore } from "../../store/themeStore";
import { Text } from "../../components/atoms/Text";
import { Row } from "../atoms/Row";


interface TableColumn {
    key: string;
    label: string;
    width?: string; // e.g. "w-16", "1/4"??
    align?: "left" | "center" | "right";
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
            className={`border-b-2 ${themedClass} ${className}`}
        >
            {columns.map((column) => (
                <Text
                    key={column.key}
                    className={`${ column.width || "flex-1"}
                    font-semibold text-sm uppercase ${
                        column.align === "center"
                            ? "text-center"
                            : column.align === "right"
                            ? "text-right"
                            : "text-left"
                    }`}
                >
                    {column.label}
                </Text>
            ))}

        </Row>
    )
}