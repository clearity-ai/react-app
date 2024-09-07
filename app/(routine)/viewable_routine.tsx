import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Themed components
import { ThemedView } from '@/components/ThemedView';
import { SimpleHeader } from '@/components/navigation/SimpleHeader';
import { RoutineTimingDetailCard } from '@/components/routine/RoutineTimingDetailCard';

// Hooks
import { useRoutines } from '@/hooks/useRoutines';

// Constants
import { timings } from '@/constants/Values';

// Types
import { Routine } from '@/constants/Types';
import { ThemedText } from '@/components/input/ThemedText';

export default function ViewableRoutineScreen() {
    const router = useRouter();
    const { routineId } = useLocalSearchParams(); // Access route params using expo-router
    const strRoutineId = routineId ? String(routineId) : ""; // assert routineId is string
    const { routinesData } = useRoutines();

    if (!routinesData.routines[strRoutineId]) {
        router.replace('(tabs)/routines');
    }

    const onEditRoutinePress = () => {
        router.push({
            pathname: '(routine)/editable_routine',
            params: { routineId: routineId },
        });
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <SimpleHeader title={routinesData.routines[strRoutineId].routineName} onClose={() => router.replace('(tabs)/routines')} onClick={onEditRoutinePress} clickIconName='pencil' />
                    <ThemedText colorName='text' fontSize={wp('5%')} fontWeight='semibold'>Total Days Logged: {routinesData.routines[strRoutineId].routineName.daysLogged}</ThemedText>
                    {timings.map(timing => (
                        <ThemedView style={styles.cardContainer} key={timing}>
                            <RoutineTimingDetailCard
                                timing={timing}
                                routineId={strRoutineId}
                            />
                        </ThemedView>
                    ))}
                </ThemedView>
            </>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        padding: wp('6%'),
        rowGap: wp('6%'),
    },
    cardContainer: {
        borderRadius: wp('3%'),
        shadowColor: '#000',
        shadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
        shadowOpacity: 0.1,
        shadowRadius: wp('1%'),
        elevation: 5, // For Android shadow
        zIndex: 1, // card is above other content
    },
});
