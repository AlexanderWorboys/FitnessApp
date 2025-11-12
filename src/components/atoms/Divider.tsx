import { View } from "react-native";
import { useThemeStore } from "../../store/themeStore";

interface DividerProps {
  lightClassName?: string;
  darkClassName?: string;
  marginY?: string;
  className?: string;
}

export const Divider = ({
  lightClassName = "bg-gray-300",
  darkClassName = "bg-gray-700",
  marginY = "my-2",
  className = "",
}: DividerProps) => {
  const { theme } = useThemeStore();

  const themedClass =
    theme === "dark"
      ? `${darkClassName} ${marginY} h-[1px] ${className}`
      : `${lightClassName} ${marginY} h-[1px] ${className}`;

  return <View className={themedClass} />;
};
