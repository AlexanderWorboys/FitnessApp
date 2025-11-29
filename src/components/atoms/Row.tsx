
import { View } from "react-native";
import { useThemeStore } from "../../store/ui/themeStore";


interface RowProps {
    lightClassName?: string;
    darkClassName?: string;
    className?: string;
    children: React.ReactNode;
}

export const Row = ({
    lightClassName = "bg-background-light border-border-light",
    darkClassName = "bg-background-dark border-border-dark",
    className = "",
    children,
    ...rest
}: RowProps) => {
    const { theme } = useThemeStore();

    const themedClass =
        theme === "dark"
            ? `${darkClassName} flex-row ${className}`
            : `${lightClassName} flex-row ${className}`;
        
    return (
        <View
            {...rest}
            className={`flex-row items-center justify-between border-b px-3 py-2 ${themedClass} ${className}`}
        >
            {children}
        </View>
    )
}