import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import { ThemedText } from '@/components/input/ThemedText';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

export type InfoCardProps = {
    backgroundColorName?: string;
    foregroundColorName?: string;
    iconName: string;
    infoTitleText: string;
    infoMainText: string;
    infoUnitText?: string;
    infoDetailText: string;
};


export function InfoCard({
    backgroundColorName,
    foregroundColorName,
    iconName,
    infoTitleText,
    infoMainText,
    infoUnitText,
    infoDetailText,
    ...rest
}: InfoCardProps) {

    const backgroundColor = useThemeColor({}, backgroundColorName ? backgroundColorName : 'tint');
    const iconColor = useThemeColor({}, foregroundColorName ? foregroundColorName : 'primaryButtonText');
    const textColor = foregroundColorName ? foregroundColorName : 'primaryButtonText';

    return (
        <View style={[styles.infoCardContainer, { backgroundColor }]}>
            <View style={styles.infoContent}>
                <MaterialCommunityIcons name={iconName} size={wp('12%')} style={{ paddingBottom: wp('4%'), marginLeft: 'auto', color: iconColor }} />
                <ThemedText colorName={textColor} style={{ paddingBottom: wp('1.5%') }}>{infoTitleText}</ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: wp('1.5%') }}>
                    <ThemedText colorName={textColor} fontSize={wp('4.5%')} fontWeight='bold'>{infoMainText}</ThemedText>
                    <ThemedText colorName={textColor}> {infoUnitText}</ThemedText>
                </View>
                <ThemedText colorName={textColor} fontSize={wp('3%')}>{infoDetailText}</ThemedText>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    infoCardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: wp('42%'),
        width: wp('42%'),
        borderRadius: wp('3%'),
    },
    infoContent: {
        flex: 0,
        paddingHorizontal: wp('4%'),
        paddingTop: wp('3%'),
    },
});