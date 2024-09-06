import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedText } from '@/components/input/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

// Utils
import { getCurrentDate } from '@/utils/dates';

export type ScreenTitleProps = {
    title: string;
};

export function ScreenTitle({ title }: ScreenTitleProps) {
    const dateColorName = "textFaded"
    const dateIconColor = useThemeColor({}, dateColorName);


    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={styles.dateContainer}>
                <Ionicons name={'sunny'} size={wp('5.5%')} color={dateIconColor} />
                <ThemedText colorName={dateColorName}> {getCurrentDate()}</ThemedText>
            </ThemedView>
            <ThemedText colorName='text' fontSize={wp('7%')} fontWeight='bold' style={{ marginBottom: wp('3%') }}>{title}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: wp('3%'),
    },
});
