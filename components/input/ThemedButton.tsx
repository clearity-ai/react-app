import { Pressable, type PressableProps, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/input/ThemedText';

export type ThemedButtonProps = PressableProps & {
    title: string;
    backgroundColorName?: string;
    textColorName?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | 'semibold';
    customStylesPressable?: object;
};

export function ThemedButton({
    title,
    onPress,
    backgroundColorName = 'tint',
    textColorName = 'background',
    fontSize = wp('5%'),
    fontWeight = 'bold',
    customStylesPressable = {},
    ...rest
}: ThemedButtonProps) {
    const backgroundColor = useThemeColor({}, backgroundColorName);

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor },
                customStylesPressable,
            ]}
            onPress={onPress}
            {...rest}>
            <ThemedText colorName={textColorName} fontSize={fontSize} fontWeight={fontWeight}>{title}</ThemedText>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderRadius: wp('3%'),
        paddingVertical: wp('2%'),
        paddingHorizontal: wp('3%'),
        height: wp('10%'),
    },
});