import { Ionicons } from "@expo/vector-icons";
import PopoverMenu, { PopoverItem } from "../popover/PopoverMenu";
import Popover from "../popover/Popover";
import PopoverTrigger from "../popover/PopoverTrigger";
import { Icon } from "../atoms";
import { Pressable } from "react-native";
import { MenuPreset, menuPresets } from "../../data/OptionsMenu/presets";

interface OptionMenuProps {
    preset?: MenuPreset;
    items?: PopoverItem[];
    iconName?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
    children?: React.ReactNode; // THis is used for overiding trigger to something other than an icon
}

const OptionsMenu = ({
    preset,
    items,
    iconName = "ellipsis-vertical",
    iconSize = 20,
    iconColor,
    children
}: OptionMenuProps) => {
    const finalItems = preset ? menuPresets[preset] : items ?? [];
    
    return (
        <Popover>
            <PopoverTrigger>
                {children ?  (
                    children
                ) : (
                    <Pressable>
                        <Icon name={iconName} size={iconSize} color={iconColor} />
                    </Pressable>
                )}
            </PopoverTrigger>

            <PopoverMenu items={finalItems} />
        </Popover>
    )
}

export default OptionsMenu