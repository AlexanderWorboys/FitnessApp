import { PopoverItem } from "../../components/popover/PopoverMenu";

export type MenuPreset = "workout" | "exercise" | "recipe" | "post";

export const menuPresets: Record<MenuPreset, PopoverItem[]> = {
    workout: [
        {
            label: "Edit Workout",
            icon: "pencil",
            onPress: () => {},
        },
        {
            label: "Delete Workout",
            icon: "trash",
            onPress: () => {},
        }
    ],

    exercise: [
        {
            label: "Delete Exercise",
            icon: "trash",
            onPress: () => {},
        }
    ],

    recipe: [
        {
            label: "Edit Recipe",
            icon: "pencil",
            onPress: () => {},
        },
        {
            label: "Delete Recipe",
            icon: "trash",
            onPress: () => {},
        }
    ],

    post: [
        {
            label: "Edit Post",
            icon: "pencil",
            onPress: () => {},
        },
        {
            label: "Delete Post",
            icon: "trash",
            onPress: () => {},
        },
        {
            label: "Report",
            icon: "trash",
            onPress: () => {},
        }
    ]
}