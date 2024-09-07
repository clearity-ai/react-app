import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedView } from '@/components/ThemedView';
import { SimpleHeader } from '@/components/navigation/SimpleHeader';
import { RoutineCard } from '@/components/routine/RoutineCard';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRoutines } from '@/hooks/useRoutines';

// Types
import { Routine } from '@/constants/Types';

export default function CheckinScreen() {
    const router = useRouter();
    const { routinesData } = useRoutines();

    const addIconColor = useThemeColor({}, 'tint');

    const onRoutinePress = (routineId: string | null) => {
        // Navigate to the confirm_routine screen
        router.push({
            pathname: '(checkin)/confirm_routine',
            params: { routineId },
        })
    };

    const onAddRoutinePress = () => {
        console.log('Add Routine Pressed');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <SimpleHeader title="Which routine are you following today?" onClose={() => router.navigate('(tabs)/home')} />
                    <ThemedView style={styles.routineListContainer}>
                        {Object.values(routinesData.routines as Record<string, Routine>).map((item: Routine, index: number) => {
                            if (item.deleted) {
                                return null;
                            }
                            return <RoutineCard
                                key={index}
                                index={index}
                                routine={item}
                                onPress={() => onRoutinePress(item.routineId)}
                            />;
                        })}
                        <ThemedView style={styles.addRoutineContainer}>
                            <TouchableOpacity onPress={onAddRoutinePress}>
                                <Ionicons name={'add-circle'} size={wp('18%')} color={addIconColor} />
                            </TouchableOpacity>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </>
        </ScrollView >
    );
}


const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        padding: wp('6%'),
        width: wp('100%'),
        paddingTop: 0,
    },
    routineListContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        rowGap: wp('3%'),
        flexWrap: "wrap",
        marginTop: wp('4%'),

    },
    addRoutineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
