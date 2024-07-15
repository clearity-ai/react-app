import { Text, type TextProps, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'small' | 'title' | 'subtitle' | 'link' | 'link_small' | 'label';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  let color;
  if (type === 'link' || type === 'link_small') {
    color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  } else {
    color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  }

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'label' ? styles.label : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'link_small' ? styles.link_small : undefined,
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
  small: {
    fontSize: wp('3.5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  link: {
    fontSize: wp('4%'),
  },
  link_small: {
    fontSize: wp('3.5%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});