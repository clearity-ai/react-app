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

const styles = StyleSheet.create({
  default: {
    fontSize: wp('4%'),  // Responsive font size
  },
  large: {
    fontSize: wp('5%'),
  },
  small: {
    fontSize: wp('3.5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'semibold',
  },
  subtitle: {
    fontSize: wp('5%'),
    fontWeight: 'semibold',
  },
  link: {
    fontSize: wp('4%'),
  },
  link_small: {
    fontSize: wp('3.5%'),
  },
  label: {
    fontSize: wp('4.5%'),
    fontWeight: 'semibold',
  },
});