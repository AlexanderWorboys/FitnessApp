import { Text, TouchableOpacity } from "react-native";
import { useThemeStore } from "../../store/ui/themeStore";

interface ChipProps {
  label: string;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
}

export const Chip = ({ label, className = "", textClassName = "", onPress }: ChipProps) => {
  const { theme } = useThemeStore();

  const baseClasses =
    theme === "dark"
      ? "bg-cyan-600"
      : "bg-cyan-500";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-3 py-1 ${baseClasses} ${className}`}
    >
      <Text className={`text-black font-medium ${textClassName}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
