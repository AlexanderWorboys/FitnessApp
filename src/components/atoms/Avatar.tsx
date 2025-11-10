import React, { useState } from "react";
import { Image, View, Text, ImageProps } from "react-native";
import { useThemeStore } from "../../store/themeStore";

type SizeVariant = "sm" | "md" | "lg" | "xl";

interface Props extends Omit<ImageProps, "source"> {
  uri?: string;
  fallback?: string; // optional fallback text (e.g. initials)
  size?: SizeVariant;
  className?: string;
}

export const Avatar = ({
  uri,
  fallback = "",
  size = "md",
  className = "",
  ...props
}: Props) => {
  const { theme } = useThemeStore();
  const [error, setError] = useState(false);

  const sizeClasses: Record<SizeVariant, string> = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-36 h-36",
  };

  const textSizeClasses: Record<SizeVariant, string> = {
    sm: "text-base",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-3xl",
  };


  return (
    <View
      className={`rounded-full overflow-hidden items-center justify-center bg-primary ${sizeClasses[size]} ${className}`}
    >
      {!error && uri ? (
        <Image
          source={{ uri }}
          onError={() => setError(true)}
          className={`w-full h-full`}
          resizeMode="cover"
          {...props}
        />
      ) : (
        <Text className={`font-semibold text-gray-600 dark:text-gray-300 ${textSizeClasses[size]}`}>
          {fallback?.toUpperCase() ?? "??"}
        </Text>
      )}
    </View>
  );
};
