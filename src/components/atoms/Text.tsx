import { Text as RNText, TextProps } from "react-native";
import { useThemeStore } from "../../store/themeStore";
import { textVariants } from "../../theme/Varients";

type Varient = "header" | "subheader" | "body" | "muted";

interface Props extends TextProps {
    lightClassName?: string;
    darkClassName?: string;
    varient? : Varient;
    className? : string;
}

export const Text = ({  
    lightClassName = "text-text-light", 
    darkClassName = "text-text-dark",
    varient = "body", 
    className = "", 
    ...props 
}: Props) => {
    const {theme} = useThemeStore();

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
