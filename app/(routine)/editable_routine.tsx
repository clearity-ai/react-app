import React, { useState, useEffect } from 'react';
import { ActionSheetIOS, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


// Themed components
import { ThemedTextInput } from '@/components/input/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/input/ThemedButton';
import { SimpleHeader } from '@/components/navigation/SimpleHeader';
import { RoutineTimingDetailCard } from '@/components/routine/RoutineTimingDetailCard';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

// Constants
import { timings } from '@/constants/Values';

// Types
import { Timing, Routine } from '@/constants/Types';
import { useRoutines } from '@/hooks/useRoutines';

export default function EditableRoutineScreen() {
    const router = useRouter();
    const { routinesData, updateRoutineName, updateRoutineSteps, deleteRoutine, undoRoutineChanges, saveRoutineChanges } = useRoutines()

    const { routineId } = useLocalSearchParams(); // Access route params using expo-router
    const strRoutineId = routineId ? String(routineId) : null; // assert routineId is string
    const routineIndex = routinesData.routines.findIndex((routine: Routine) => routine.routineId === strRoutineId);

    const addOrRemoveIconColor = useThemeColor({}, 'tint');
    const setRoutineName = (routineName: string) => {
        updateRoutineName(routineIndex, routineName);
    };

    const onAddStepPress = (timing: Timing) => () => {
        updateRoutineSteps(routineIndex, timing, 'add');
    }

    const onRemoveStepPress = (timing: Timing) => () => {
        updateRoutineSteps(routineIndex, timing, 'remove');
    }

    const onDeleteRoutinePress = () => {
        deleteRoutine(routineIndex);
        router.replace('(tabs)/routines');
    }

    const onCloseWithoutSaving = () => {
        undoRoutineChanges();
        router.replace('(tabs)/routines');
    }

    const onSaveRoutine = () => {
        saveRoutineChanges();
        router.replace('(tabs)/routines');
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <SimpleHeader title="Edit Routine" onClose={onCloseWithoutSaving} onClick={onSaveRoutine} clickIconName='checkmark' />
                    <ThemedTextInput
                        backgroundColorName='background'
                        borderWidth={1}
                        fontSize={wp('5%')}
                        placeholder="Enter routine name..."
                        value={routinesData.routines[routineIndex].routineName}
                        onChangeText={setRoutineName}
                        style={{ width: wp('90%') }}
                    />
                    {timings.map(timing => (
                        <ThemedView style={styles.timingContainer} key={timing}>
                            <ThemedView style={styles.cardContainer}>
                                <RoutineTimingDetailCard
                                    timing={timing}
                                    routineIndex={routineIndex}
                                    editMode={true}
                                />
                            </ThemedView>
                            <ThemedView style={styles.addOrRemoveStepContainer}>
                                <TouchableOpacity onPress={onAddStepPress(timing)}>
                                    <Ionicons name={'add-circle'} size={wp('15%')} color={addOrRemoveIconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onRemoveStepPress(timing)}>
                                    <Ionicons name={'remove-circle-outline'} size={wp('15%')} color={addOrRemoveIconColor} />
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                    ))}
                    <ThemedView style={styles.buttonContainer}>
                        <ThemedButton backgroundColorName="error" title='Delete Routine' onPress={onDeleteRoutinePress} />
                    </ThemedView>
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
    timingContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        rowGap: wp('3%'),
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
    addOrRemoveStepContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
    },
});
