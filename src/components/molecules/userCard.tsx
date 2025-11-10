import { View } from "react-native"
import { Avatar } from "../atoms/Avatar"
import { Icon, Text } from "../atoms"

type postType = "" | "Workout By" | "Recipe By" | "Summary By" | "Route Ran By";

interface UserCardProps {
    username: string,
    isVerified: boolean,
    verification?: string,
    postType?: postType
}

export const UserCard = ({
    username = "John Doe",
    isVerified = true,
    verification = "Qualified Personal Trainer",
    postType = "Workout By"
}: UserCardProps) => {
    return (
        <View className="flex flex-row items-center">
            <Avatar fallback="JD" uri="https://i.pravatar.cc/150?img=1" />
            <View className="ml-2 flex-1">
                <Text varient="muted">{postType}</Text>
                <View className="flex flex-row items-center gap-1">
                    <Text varient="subheader">{username}</Text>
                    {isVerified && 
                    <>
                        <Icon name="checkmark-circle" className="text-primary" />
                        <Text varient="muted">{verification}</Text>
                    </>
                    }
                </View>
            </View>
        </View>
    )
}