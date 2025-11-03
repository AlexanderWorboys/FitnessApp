import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Button, View } from 'react-native';

export default function Test() {
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(offset.value * 100) }],
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'tomato' }, animatedStyle]} />
      <Button title="Move" onPress={() => (offset.value = Math.random())} />
    </View>
  );
}
