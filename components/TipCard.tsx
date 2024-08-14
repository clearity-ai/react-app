import { StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { ThemedText } from '@/components/input/ThemedText';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

export type TipCardProps = {
    imageURI: string;
    tipTitleText: string;
    tipMainText: string;
};


export function TipCard({
    imageURI,
    tipTitleText,
    tipMainText,
    ...rest
}: TipCardProps) {

    const backgroundColor = useThemeColor({}, 'background');
    return (
        <View style={[styles.tipCardContainer, { backgroundColor }]} {...rest}>
            <Image source={{ uri: imageURI }} style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <ThemedText colorName='text' fontSize={wp('4.5%')} fontWeight='bold' style={{ paddingBottom: wp('1.5%') }}>{tipTitleText}</ThemedText>
                <ThemedText colorName='textFaded' fontSize={wp('4%')}>{tipMainText}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tipCardContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        overflow: 'hidden', // image fits within the container's border radius
        borderRadius: wp('3%'),

    },
    imageStyle: {
        width: wp('30%'),
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 2,
        padding: wp('4%'),
        justifyContent: 'center',
    },
});