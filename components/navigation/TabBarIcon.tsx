// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={wp('7%')} style={[{ marginBottom: -wp('2%') }, style]} {...rest} />;
}
