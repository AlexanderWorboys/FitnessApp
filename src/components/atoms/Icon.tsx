import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../store/themeStore";
import { Text } from "react-native";

interface Props {
    name: keyof typeof Ionicons.glyphMap;
    size?: number;
    /**
     * Pass a color string like '#ff0000' or 'blue' to force a color.
     * If omitted or set to 'currentColor', the icon will inherit the surrounding text color
     * which is controlled by the light/dark classes — this enables theme-aware icons.
     */
    color?: string;
    lightColorClass?: string;
    darkColorClass?: string;
    className?: string;
}

export const Icon = ({
    name,
    size = 24,
    color,
    lightColorClass = "text-text-light",
    darkColorClass = "text-text-dark",
    className = "",
}: Props) => {
    const { theme } = useThemeStore();

    const themedColorClass =
        theme === "dark" ? `${darkColorClass} ${className}` : `${lightColorClass} ${className}`;

    // If caller explicitly passes a color and it's not 'currentColor', forward it to the icon.
    // Otherwise leave it undefined so the icon inherits the parent Text color (theme-aware).
    const resolvedColor = color && color !== "currentColor" ? color : undefined;

    return (
        <Text className={themedColorClass}>
            <Ionicons name={name} size={size} color={resolvedColor} />
        </Text>
    );
};