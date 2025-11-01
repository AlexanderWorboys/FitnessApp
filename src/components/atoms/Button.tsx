import { Pressable, Text } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
};

export const Button = ({ label, onPress, variant = 'primary' }: ButtonProps) => {
  const base =
    'px-4 py-3 rounded-2xl items-center justify-center shadow';
  const variants = {
    primary: `${base} bg-primary`,
    secondary: `${base} bg-accent`,
    outline: `${base} border border-primary`,
  };

  return (
    <Pressable className={variants[variant]} onPress={onPress}>
      <Text className="text-white font-semibold">{label}</Text>
    </Pressable>
  );
};