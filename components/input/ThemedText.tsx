import { Text, type TextProps, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  colorName?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'semibold';
};

export function ThemedText({
  style,
  colorName,
  fontSize,
  fontWeight,
  ...rest
}: ThemedTextProps) {
  if (!fontSize) {
    fontSize = wp('4%');
  }
  if (!fontWeight) {
    fontWeight = 'normal';
  }

  const color = useThemeColor({}, colorName ? colorName : 'text');

  return (
    <Text
      style={[
        { color, fontSize, fontWeight },
        style,
      ]}
      {...rest}
    />
  );
}