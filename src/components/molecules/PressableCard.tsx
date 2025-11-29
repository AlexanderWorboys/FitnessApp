import { Pressable } from "react-native";
import { Card, CardProps } from "../atoms/Card";

interface PressableCardProps extends CardProps {
    onPress?: () => void;
}

const PressableCard = ({onPress, ...props}: PressableCardProps) => {
    if(onPress) {
        return (
            <Pressable onPress={onPress}>
                <Card {...props} />
            </Pressable>
        )
    }

    return <Card {...props} />
}

export default PressableCard;