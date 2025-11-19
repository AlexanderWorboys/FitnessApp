import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { Icon } from './Icon';

type Varient =
  | "primary"
  | "danger"
  | "black"
  | "blue"
  | "outline"
  | "ghost"


interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Varient
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  className?: string;
  textClassName?: string;
};

const varients = {
    primary: 'bg-primary',
    danger: 'bg-red-500',
    black: 'bg-black border border-white',
    blue: 'bg-blue-500',
    outline: 'border border-primary',
    ghost: ''
  };

export const Button = ({ 
  label, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  iconSize = 18,
  className = "",
  textClassName = ""
}: ButtonProps) => {
  const disabledStyles = disabled
    ? "opacity-50"
    : "active:opacity-80";
  

  return (
    <Pressable 
      disabled={disabled || loading}  
      className={`px-4 py-3 flex-row rounded-2xl items-center justify-center shadow ${varients[variant]} ${className}`} 
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <>
          {leftIcon && (
            <Icon 
              name={leftIcon}
              size={iconSize}
              color='white'
              className='mr-2'
            />
          )}

          <Text className={`text-white font-inter-semibold ${textClassName}`}>
            {label}
          </Text>

          {rightIcon && (
            <Icon 
              name={rightIcon}
              size={iconSize}
              color='white'
              className='mr-2'
            />
          )}
        </>
      )}
    </Pressable>
  );
};