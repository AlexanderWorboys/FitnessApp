import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { usePopover } from "./Popover";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "../atoms";

const SCREEN = Dimensions.get("window");
const MENU_WIDTH = 190;
const MARGIN = 8;

export type PopoverItem = {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    destructive?: boolean;
    onPress: () => void;
};

export default function PopoverMenu({ items }: { items: PopoverItem[] }) {
  const { open, closePopover, anchor } = usePopover();

  if (!open) return null;

  // -----------------------------
  // Vertical placement
  // -----------------------------
  const enoughSpaceBelow = anchor.y + anchor.h + MENU_WIDTH < SCREEN.height;
  console.log("anchor:", anchor)
  console.log("enough space:", enoughSpaceBelow)

  const top = enoughSpaceBelow
    ? anchor.y + anchor.h + MARGIN
    : anchor.y - MENU_WIDTH - MARGIN;

  // -----------------------------
  // Horizontal placement
  // -----------------------------
  let left = anchor.x;

  // Clamp left to avoid overflow
  if (left + MENU_WIDTH > SCREEN.width - MARGIN) {
    console.log("should switch to right")
    left = SCREEN.width - MENU_WIDTH - MARGIN;
    }
  if (left < MARGIN) {
    console.log("left margin")
  left = MARGIN;
}

    console.log("Left: ", left, " Popup Top: ", top, "Anchor Top: ", anchor.y)


  return (
    <Animated.View
      entering={ZoomIn.duration(140)}
      exiting={ZoomOut.duration(140)}
      style={{
        position: "absolute",
        top,
        left,
        width: MENU_WIDTH,
        backgroundColor: "#1f1f1f",
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        zIndex: 9999,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      {items.map((item, i) => (
        <Pressable
          key={i}
          onPress={() => {
            closePopover();
            setTimeout(item.onPress, 10);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            paddingVertical: 10,
            gap: 10,
          }}
        >
          {item.icon && (
            <Icon
              name={item.icon}
              size={18}
              color={item.destructive ? "#ff4d4d" : "white"}
            />
          )}

          <Text
            style={{
              color: item.destructive ? "#ff4d4d" : "white",
              fontSize: 15,
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </Animated.View>
  );
}
