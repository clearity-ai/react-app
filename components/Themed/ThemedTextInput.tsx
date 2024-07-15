import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeholderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textInputPlaceholder');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textInputBackground');
  const borderWidth = 0;
  const borderRadius = wp('2%');

  return (
    <TextInput
      style={[
        { color, backgroundColor, borderWidth, borderRadius, fontSize: wp('4%'), paddingVertical: wp('2%'), justifyContent: 'center', paddingLeft: wp('2%'), },
        style,
      ]}
      placeholderTextColor={placeholderTextColor}

      {...rest}
    />
  );
}