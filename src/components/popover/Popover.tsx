import React, { createContext, PropsWithChildren, ReactNode, useContext, useRef, useState } from "react";
import { Modal, Pressable, View, findNodeHandle, UIManager } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export type AnchorRect = {
    x: number;
    y: number;
    w: number;
    h: number;
};

export type PopoverContextType = {
    triggerRef: React.RefObject<View | null>; // remove null if errors
    openPopover: () => void;
    closePopover: () => void;
    open: boolean;
    anchor: AnchorRect;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopover() {
    const ctx = useContext(PopoverContext);
    if (!ctx) {
        throw new Error("usePopover must be used inside <Popover>");
    }
    return ctx;
}

export default function Popover({ children }: { children: ReactNode }) {
    const triggerRef = useRef<View | null>(null);

    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState<AnchorRect>({ x: 0, y: 0, w: 0, h: 0 });

      const openPopover = () => {
        triggerRef.current?.measureInWindow((x, y, w, h) => {
            console.log("measurement x:", x, " y:", y, " w:", w, " h:", h)
          setAnchor({ x, y, w, h });
          setOpen(true);
        });
      };

    // const openPopover = () => {
    //     const handle = findNodeHandle(triggerRef.current);

    //     if (!handle) return;

    //     UIManager.measure(
    //         handle,
    //         (
    //             _x: number,
    //             _y: number,
    //             width: number,
    //             height: number,
    //             pageX: number,
    //             pageY: number
    //         ) => {
    //             setAnchor({ x: pageX, y: pageY, w: width, h: height });
    //             setOpen(true);
    //         }
    //     );
    // };

    const closePopover = () => setOpen(false);

    return (
        <PopoverContext.Provider value={{ triggerRef, openPopover, closePopover, open, anchor }}>
            {children}

            {/* Render overlay only when open */}
            <Modal transparent visible={open} animationType="none">
                <Pressable
                    onPress={closePopover}
                    style={{ flex: 1 }}
                >
                    {/* Animated Wrapper */}
                    <Animated.View
                        entering={FadeIn.duration(120)}
                        exiting={FadeOut.duration(120)}
                        style={{ flex: 1 }}
                    />
                </Pressable>

                {/* Floating Popover Container */}
                <PopoverFloating />
            </Modal>
        </PopoverContext.Provider>
    );
}

// This will be filled by PopoverMenu
function PopoverFloating() {
    return null;
}
