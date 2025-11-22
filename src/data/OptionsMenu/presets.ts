import { Ionicons } from "@expo/vector-icons";
import { PopoverItem } from "../../components/popover/PopoverMenu";

//export type MenuPreset = "workout" | "exercise" | "recipe" | "post";

export type PopoverMenuActions = {
  edit?: () => void;
  delete?: () => void;
  report?: () => void;
};

export const menuPresets = {
    workout: (actions: PopoverMenuActions): PopoverItem[] => [
        {
            label: "Edit Workout",
            icon: "pencil",
            onPress: actions.edit,
        },
        {
            label: "Delete Workout",
            icon: "trash",
            destructive: true,
            onPress: actions.delete,
        }
    ],

    exercise: (actions: PopoverMenuActions): PopoverItem[] =>  [
        {
            label: "Remove Exercise",
            icon: "trash",
            destructive: true,
            onPress: actions.delete,
        }
    ],

    recipe: (actions: PopoverMenuActions): PopoverItem[] =>  [
        {
            label: "Edit Recipe",
            icon: "pencil" as keyof typeof Ionicons.glyphMap,
            onPress: actions.edit,
        },
        {
            label: "Delete Recipe",
            icon: "trash",
            destructive: true,
            onPress: actions.delete,
        }
    ],

    post: (actions: PopoverMenuActions): PopoverItem[] =>  [
        {
            label: "Edit Post",
            icon: "pencil",
            onPress: actions.edit,
        },
        {
            label: "Delete Post",
            icon: "trash",
            destructive: true,
            onPress: actions.delete,
        },
        {
            label: "Report",
            icon: "flag",
            onPress: actions.report,
        }
    ]
} as const;

export type MenuPreset = keyof typeof menuPresets;