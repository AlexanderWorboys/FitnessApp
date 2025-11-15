import { Text as RNText, TextProps } from "react-native";
import { useThemeStore } from "../../store/themeStore";

type Varient = "title" | "header" | "subheader" | "body" | "muted";

interface Props extends TextProps {
    lightClassName?: string;
    darkClassName?: string;
    varient?: Varient;
    className?: string;
}

const textVariants = {
    title: "text-4xl font-inter-bold",
    header: "text-xl font-inter-bold",
    subheader: "text-lg font-semibold",
    body: "text-inter",
    muted: "text-inter-light",
};

export const Text = ({
    lightClassName = "text-text-light",
    darkClassName = "text-text-dark",
    varient = "body",
    className = "",
    ...props
}: Props) => {
    const { theme } = useThemeStore();

    const colorClasses =
        varient === "muted"
            ? theme === "dark"
                ? "text-text-muted-dark"
                : "text-text-muted-light"
            : theme === "dark"
                ? darkClassName
                : lightClassName;

    const themedClass = `${textVariants[varient]} ${colorClasses} ${className}`;
    return <RNText className={themedClass} {...props} />
}
