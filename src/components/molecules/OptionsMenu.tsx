import { Ionicons } from "@expo/vector-icons";
import PopoverMenu, { PopoverItem } from "../popover/PopoverMenu";
import Popover from "../popover/Popover";
import PopoverTrigger from "../popover/PopoverTrigger";
import { Icon } from "../atoms";
import { Pressable } from "react-native";
import { MenuPreset, menuPresets, PopoverMenuActions } from "../../data/OptionsMenu/presets";

interface OptionMenuProps<P extends MenuPreset> {
    preset?: P
    items?: PopoverItem[];
    actions?: PopoverMenuActions;
    iconName?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
    children?: React.ReactNode; // THis is used for overiding trigger to something other than an icon
}

const OptionsMenu = <P extends MenuPreset>({
    preset,
    items,
    actions,
    iconName = "ellipsis-vertical",
    iconSize = 20,
    iconColor,
    children
}: OptionMenuProps<P>) => {
    const finalItems = preset ? menuPresets[preset](actions ?? {}) : items ?? [];
    
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