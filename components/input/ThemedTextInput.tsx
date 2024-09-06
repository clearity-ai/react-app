import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  textColorName?: string;
  placeholderTextColorName?: string;
  fontSize?: number;
  backgroundColorName?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderColorName?: string;
};

export function ThemedTextInput({
  style,
  textColorName = 'text',
  placeholderTextColorName = 'textPlaceholder',
  fontSize = wp('4%'),
  backgroundColorName = 'textPlaceholderBackground',
  borderWidth = 0,
  borderRadius = wp('2%'),
  borderColorName = 'textPlaceholder',
  ...rest
}: ThemedTextInputProps) {

  const color = useThemeColor({}, textColorName);
  const placeholderTextColor = useThemeColor({}, placeholderTextColorName);
  const backgroundColor = useThemeColor({}, backgroundColorName);
  const borderColor = useThemeColor({}, borderColorName);

  return (
    <TextInput
      style={[
        { color, backgroundColor, borderWidth, borderRadius, borderColor, fontSize, paddingVertical: wp('2%'), justifyContent: 'center', paddingLeft: wp('2%'), },
        style,
      ]}
      placeholderTextColor={placeholderTextColor}

      {...rest}
    />
  );
}