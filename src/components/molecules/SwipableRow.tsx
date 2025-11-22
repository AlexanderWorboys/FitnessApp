import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { useThemeStore } from "../../store/themeStore";
import { TableRow } from "./TableRow";
import { Icon } from "../atoms/Icon";

interface SwipeableRowProps {
  rowData: Record<string, any>;
  columns: any[];
  onChange?: (key: string, value: any) => void;
  onTrailing?: () => void; // Swipe Right Action (e.g., Delete)
  onLeading?: () => void; // Swipe Left Action (e.g., Edit)
  swipeable?: boolean;
}

const SWIPE_THRESHOLD = 150;
const MAX_TRANSLATE = 200;

export const SwipeableRow = ({
  rowData,
  columns,
  onChange,
  onTrailing,
  onLeading,
  swipeable = false,
}: SwipeableRowProps) => {
  const { theme } = useThemeStore();
  const translateX = useSharedValue(0);

  if (!swipeable) {
    return <TableRow rowData={rowData} columns={columns} onChange={onChange} />;
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-5, 5])
    .onUpdate((event) => {
      translateX.value = Math.min(
        Math.max(event.translationX, -MAX_TRANSLATE),
        MAX_TRANSLATE
      );
    })
    .onEnd(() => {
      if (translateX.value < -SWIPE_THRESHOLD && onTrailing) {
        runOnJS(onTrailing)(); // ✅ Safe cross-thread call
        translateX.value = withSpring(0);
      } else if (translateX.value > SWIPE_THRESHOLD && onLeading) {
        runOnJS(onLeading)(); // ✅ Safe cross-thread call
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedRowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rightActionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      -translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      "clamp"
    ),
  }));

  const leftActionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      "clamp"
    ),
  }));

  return (
    <View className="overflow-hidden relative">
      {/* Right Action */}
      {onTrailing && (
        <Animated.View
          style={rightActionStyle}
          className="absolute right-0 top-0 bottom-0 w-full bg-red-500 justify-center items-end pr-4"
        >
          <Pressable onPress={onTrailing}>
            <Icon name="trash" size={24} className="text-white" />
          </Pressable>
        </Animated.View>
      )}

      {/* Left Action */}
      {onLeading && (
        <Animated.View
          style={leftActionStyle}
          className="absolute left-0 top-0 bottom-0 w-full bg-blue-500 flex-row items-center justify-start px-4"
        >
          <Pressable onPress={onLeading}>
            <Icon name="pencil" size={24} className="text-white" />
          </Pressable>
        </Animated.View>
      )}

      <GestureDetector gesture={pan}>
        <Animated.View style={animatedRowStyle}>
          <TableRow rowData={rowData} columns={columns} onChange={onChange} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SwipeableRow;
