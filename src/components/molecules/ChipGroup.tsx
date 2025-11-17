import { ScrollView, View } from "react-native";
import { Chip } from "../atoms/Chip";

interface ChipGroupProps {
  items: string[];
  className?: string;
  chipSpacing?: string; // gap between chips (Tailwind)
}

export const ChipGroup = ({
  items,
  className = "",
  chipSpacing = "mr-1",
}: ChipGroupProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
    >
      <View className="flex-row items-center">
        {items.map((label, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const isSingle = items.length === 1;

          let borderRadiusClass = "";

          if (isSingle) {
            // fully rounded chip
            borderRadiusClass = "rounded-full";
          } else if (isFirst) {
            borderRadiusClass = "rounded-l-full";
          } else if (isLast) {
            borderRadiusClass = "rounded-r-full";
          }

          return (
            <Chip
              key={label + index}
              label={label}
              className={`${borderRadiusClass} ${!isLast ? chipSpacing : ""}`}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
