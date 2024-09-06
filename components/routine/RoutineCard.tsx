import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { ThemedText } from '@/components/input/ThemedText';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

// Types
import { Routine } from '@/constants/Types';

export type RoutineCardProps = {
    index: number;
    routine: Routine;
    onPress: () => void;
};

export function RoutineCard({
    index,
    routine,
    onPress,
    ...rest
}: RoutineCardProps) {

    // Rotating colors and icons
    const colorNames = ['tint', 'tintSecondary', 'tintPrimaryDarker', 'tintSecondaryDarker']
    const iconNames = ['pump-soap', 'eye-dropper', 'droplet']
    const colorIndex = index % colorNames.length
    const iconIndex = index % iconNames.length
    const backgroundColor = useThemeColor({}, colorNames[colorIndex]);
    const buttonColor = useThemeColor({}, 'textPlaceholder');
    const iconName = iconNames[iconIndex]

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: backgroundColor }]}>
                    <FontAwesome6 name={iconName} color="#fff" size={wp('6%')} />
                </View>
                <View style={styles.textContainer}>
                    <ThemedText colorName='text' fontSize={wp('5%')}>{routine.routineName}</ThemedText>
                    <ThemedText colorName='text' fontSize={wp('3%')} fontWeight='bold'>{routine.daysLogged} days total</ThemedText>
                </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={wp('6%')} color={buttonColor} />
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: wp('3%'),
        borderRadius: wp('3%'),
        shadowColor: '#000',
        shadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
        shadowOpacity: 0.1,
        shadowRadius: wp('1%'),
        elevation: 5, // For Android shadow
        zIndex: 1, // card is above other content
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: wp('14%'),
        height: wp('14%'),
        borderRadius: wp('14%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('4%'),
    },
    textContainer: {
        justifyContent: 'center',
    },
});