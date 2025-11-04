import { useThemeStore } from "../../store/themeStore";
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
    // console.log("inputVarients:", inputVariants);
    // console.log("variant:", variant);
    // console.log("theme:", theme);
    // console.log("inputVarients[variant]:", inputVariants[variant]);
    const baseClasses = inputVariants[variant][theme];
    const stateClasses = inputStateVariants[state];
    // const themedClass =
    // theme === "dark"
    //   ? `${darkClassName} ${inputStateVariants[state]}`
    //   : `${lightClassName} ${inputStateVariants[state]}`;

      return (
        <TextInput
            className={`px-4 py-3 ${baseClasses} ${stateClasses} ${className}`}
            placeholder={placeholder}
            placeholderTextColor={theme === "dark" ? "#A0A0A0" : "#606060"}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
      )

}