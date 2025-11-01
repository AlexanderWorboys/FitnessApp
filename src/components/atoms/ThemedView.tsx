import { View, ViewProps } from "react-native";
import { useThemeStore } from "../../store/themeStore";
import React from "react";

interface ThemedViewProps extends ViewProps {
  lightClassName?: string;
  darkClassName?: string;
  children: React.ReactNode;
}

export const ThemedView = ({
  lightClassName = "bg-background-light",
  darkClassName = "bg-background-dark",
  style,
  className = "",
  children,
  ...rest
}: ThemedViewProps) => {
  const { theme } = useThemeStore();
  const themedClass =
    theme === "dark"
      ? `${darkClassName} ${className}`
      : `${lightClassName} ${className}`;
  return (
    <View className={themedClass} style={style} {...rest}>
      {children}
    </View>
  );
};
