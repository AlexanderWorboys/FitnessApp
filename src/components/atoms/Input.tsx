import { useThemeStore } from "../../store/themeStore";
import { TextInput } from "react-native";
import { inputStateVariants } from "../../theme/Varients";

export type InputState = "default" | "success" | "error";

interface InputProps {
    keyboardType?: "numeric" | "default"
    lightClassName?: string;
    darkClassName?: string;
    state?: InputState;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    className?: string;
}


export const Input = ({
    keyboardType = "default",
    lightClassName = "bg-muted-light text-text-light",
    darkClassName = "bg-muted-dark text-text-dark",
    state = "default",
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    className = ""
}: InputProps) => {
    const { theme } = useThemeStore();
    const themedClass =
    theme === "dark"
      ? `${darkClassName} ${inputStateVariants[state]}`
      : `${lightClassName} ${inputStateVariants[state]}`;

      return (
        <TextInput
            className={`border px-4 py-3 ${themedClass} ${className}`}
            placeholder={placeholder}
            placeholderTextColor={theme === "dark" ? "#A0A0A0" : "#606060"}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
      )

}