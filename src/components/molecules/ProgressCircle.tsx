import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Text } from "../atoms/Text";
import { useThemeStore } from "../../store/ui/themeStore";

type SizeVariant = "sm" | "md" | "lg" | "xl";

interface Props {
  progress: number; // current value (e.g. 1200)
  goal: number; // target (e.g. 2000)
  label?: string; // optional text, e.g. "Remaining"
  size?: SizeVariant;
  strokeColor?: string;
  backgroundColor?: string;
}

/**
 * Molecule: ProgressCircle
 * - Animated circular progress indicator
 * - Displays dynamic text/stat in center
 */
export const ProgressCircle = ({
  progress,
  goal,
  label = "Remaining",
  size = "md",
  strokeColor = "#22D3EE",
  backgroundColor = "#374151",
}: Props) => {
  const { theme } = useThemeStore();
  const percent = Math.min(progress / goal, 1); // cap at 100%

  const sizeMap: Record<SizeVariant, number> = {
    sm: 80,
    md: 120,
    lg: 160,
    xl: 220,
  };

  const strokeWidth = 8;
  const radius = (sizeMap[size] - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * percent;

  const bgColor = theme === "dark" ? "#1F2937" : "#F3F4F6"; // gray-800 vs gray-100

  const remaining = goal - progress > 0 ? goal - progress : 0;

  return (
    <View
      className="items-center justify-center"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    >
      <Svg
        width={sizeMap[size]}
        height={sizeMap[size]}
        viewBox={`0 0 ${sizeMap[size]} ${sizeMap[size]}`}
      >
        {/* Background circle */}
        <Circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={sizeMap[size] / 2}
          originY={sizeMap[size] / 2}
          fill="none"
        />
      </Svg>

      {/* Center Text */}
      <View className="absolute items-center">
        <Text
          varient="header"
          className=""
        >
          {remaining}
        </Text>
        <Text
          varient="body"
          className=""
        >
          {label}
        </Text>
      </View>
    </View>
  );
};
