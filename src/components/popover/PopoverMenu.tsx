import React, { useState } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { usePopover } from "./Popover";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "../atoms";
import { Portal } from "@gorhom/portal";

const SCREEN = Dimensions.get("window");
const MENU_WIDTH = 190;
const MARGIN = 8;

export type PopoverItem = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  destructive?: boolean;
  onPress?: () => void;
};

export default function PopoverMenu({ items }: { items: PopoverItem[] }) {
  const { open, closePopover, anchor } = usePopover();
  const [menuHeight, setMenuHeight] = useState(0);

  if (!open) return null;

  const enoughSpaceBelow = anchor.y + anchor.h + menuHeight < SCREEN.height;

  const top = enoughSpaceBelow
    ? anchor.y + anchor.h + MARGIN
    : anchor.y - menuHeight - MARGIN;

  let left = anchor.x;

  // Clamp left to avoid overflow
  if (left + MENU_WIDTH > SCREEN.width - MARGIN) {
    left = SCREEN.width - MENU_WIDTH - MARGIN;
  }
  if (left < MARGIN) {
    left = MARGIN;
  }

  const originX = anchor.x < SCREEN.width / 2 ? 0 : MENU_WIDTH;
  const originY = enoughSpaceBelow ? 0 : MENU_WIDTH;

  return (
    <Portal>
      <Animated.View
        entering={ZoomIn.duration(140)}
        exiting={ZoomOut.duration(140)}
        onLayout={(e) => {
          setMenuHeight(e.nativeEvent.layout.height);
        }}
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
          transformOrigin: `${originX}px ${originY}px`
        }}
      >
        {items.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => {
              closePopover();
              //setTimeout(item.onPress, 10);
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
    </Portal>
  );
}
