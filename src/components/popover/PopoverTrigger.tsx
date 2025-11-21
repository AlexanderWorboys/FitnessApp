import React, { ReactNode } from "react";
import { View } from "react-native";
import { usePopover } from "./Popover";

export default function PopoverTrigger({ children }: { children: ReactNode }) {
  const { triggerRef, openPopover } = usePopover();

  return (
    <View
      ref={triggerRef}
      collapsable={false}
      onTouchEnd={openPopover}
    >
      {children}
    </View>
  );
}
