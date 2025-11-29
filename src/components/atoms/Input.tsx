import { useThemeStore } from "../../store/ui/themeStore";
import { TextInput } from "react-native";
import { inputStateVariants, inputVariants } from "../../theme/Varients";

export type InputState = "default" | "success" | "error" | "blended";

interface InputProps {
    keyboardType?: "numeric" | "default"
    variant?: keyof typeof inputVariants;
    state?: InputState;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    className?: string;
}


export const Input = ({
    keyboardType = "default",
    variant = "default",
    state = "default",
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    className = ""
}: InputProps) => {
    const { theme } = useThemeStore();
    const baseClasses = inputVariants[variant][theme];
    const stateClasses = inputStateVariants[state];
    // const themedClass =
    // theme === "dark"
    //   ? `${darkClassName} ${inputStateVariants[state]}`
    //   : `${lightClassName} ${inputStateVariants[state]}`;

      return (
        <TextInput
            className={`${baseClasses} ${stateClasses} ${className}`}
            placeholder={placeholder}
            placeholderTextColor={theme === "dark" ? "#A0A0A0" : "#606060"}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
      )

}