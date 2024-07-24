import { Pressable, type PressableProps, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = PressableProps & {
    title: string;
    lightBackgroundColor?: string;
    darkBackgroundColor?: string;
    lightTextColor?: string;
    darkTextColor?: string;
    type?: 'primary' | 'secondary';
};

export function ThemedButton({
    title,
    onPress,
    lightBackgroundColor,
    darkBackgroundColor,
    lightTextColor,
    darkTextColor,
    type = 'primary',
    ...rest
}: ThemedButtonProps) {
    const backgroundColor = useThemeColor(
        { light: lightBackgroundColor, dark: darkBackgroundColor },
        type === 'primary' ? 'primaryButtonBackground' : 'secondaryButtonBackground',
    );
    const color = useThemeColor(
        { light: lightTextColor, dark: darkTextColor },
        type === 'primary' ? 'primaryButtonText' : 'secondaryButtonText',
    );

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor },
            ]}
            onPress={onPress}
            {...rest}>
            <Text style={[styles.text, { color }]}>{title}</Text>
        </Pressable>
    );


}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: wp('3%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('4%'),
        elevation: 3,
    },
    text: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },
});