
import { StyleSheet, Pressable, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedButton } from '@/components/input/ThemedButton';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedCheckinProps = {
    onPress: () => void;
    borderColorName?: string;
    buttonColorName?: string;
    buttonTextColorName?: string;
};

export function ThemedCheckin({
    onPress,
    borderColorName,
    buttonColorName,
    buttonTextColorName,
    ...rest
}: ThemedCheckinProps) {
    const borderColor = useThemeColor({}, borderColorName ? borderColorName : 'tintPrimaryDarker');


    return (
        <Pressable
            onPress={onPress}
        >
            <View style={[styles.captureContainer, { borderColor }]}>
                <Ionicons name="aperture" size={wp('25%')} style={{ alignSelf: 'center', color: borderColor }} />
                <View style={styles.capture}>
                    <ThemedButton
                        title="Check In"
                        fontWeight='semibold'
                        {...rest}
                    />
                </View>
            </View>
        </Pressable >
    );
}

const styles = StyleSheet.create({
    captureContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: wp('70%'),
        borderWidth: wp('1.5%'),
        borderRadius: wp('3%'),
        marginHorizontal: wp('7%'),
    },
    capture: {
        flex: 0,
        paddingHorizontal: wp('10%'),
        paddingTop: wp('13%'),
        paddingBottom: wp('3%'),
        justifyContent: 'center',
    },
});
