import { View, ViewProps } from "react-native";
import { useThemeStore } from "../../store/ui/themeStore";

type Varient = "elevated" | "outlined" | "flat";

export interface CardProps extends ViewProps {
    lightClassName?: string;
    darkClassName?: string;
    variant?: Varient;
    className?: string;
    children: React.ReactNode;
}


export const Card = ({
    lightClassName = "bg-card-light",
    darkClassName = "bg-card-dark",
    variant = "elevated",
    className = "",
    ...props
}: CardProps) => {
    const { theme } = useThemeStore();

  const variantClasses: Record<Varient, string> = {
    elevated: "shadow-md shadow-black/10 dark:shadow-white/10",
    outlined: "border border-border-light dark:border-border-dark",
    flat: "",
  };

  const themedClass =
    theme === "dark"
      ? `${darkClassName} ${variantClasses[variant]}`
      : `${lightClassName} ${variantClasses[variant]}`;

    return (
        <View
            className={`${themedClass} ${className}`}
            {...props}
        >
            {props.children}
        </View>
    );
};