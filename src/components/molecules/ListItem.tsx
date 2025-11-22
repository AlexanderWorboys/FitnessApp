import { View } from "react-native"
import { Avatar } from "../atoms/Avatar"
import { Icon, Text } from "../atoms"

interface ListItemProps {
    title: string;
    subtext: string;
    onPress?: () => void;
    popOverActions?: () => void;
}

export const ListItem = ({
    title = "title",
    subtext = "Description"
}: ListItemProps) => {

    return (
        <View className="flex gap-3 flex-row justify-center items-center">
            <Avatar />
            <View className="flex-1">
                <Text varient="subheader">{title}</Text>
                <Text varient="muted">{subtext}</Text>
            </View>
            <Icon name="ellipsis-horizontal" />
        </View>
    )
}