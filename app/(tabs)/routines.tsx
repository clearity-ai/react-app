import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedView } from '@/components/ThemedView';
import { ScreenTitle } from '@/components/navigation/ScreenTitle';
import { RoutineCard } from '@/components/routine/RoutineCard';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRoutines } from '@/hooks/useRoutines';

// Constants
import { placeholderId } from '@/constants/Values';

// Types
import { Routine } from '@/constants/Types';

export default function RoutinesScreen() {
  const router = useRouter();
  const addIconColor = useThemeColor({}, 'tint');

  const { routinesData, addNewRoutine } = useRoutines();

  // onRoutinePress for each routine card
  const onRoutinePress = (routineId: string | null) => {
    // Navigate to the routine screens
    router.push({
      pathname: '(routine)/viewable_routine',
      params: { routineId },
    })
  }

  // onAddRoutinePress for empty editable routine card
  const onAddRoutinePress = () => {
    addNewRoutine(placeholderId);
    router.push({
      pathname: '(routine)/editable_routine',
      params: { routineId: placeholderId },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <>
        <ThemedView style={styles.mainContainer}>
          <ScreenTitle title="My Routines" />
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
    paddingTop: 0,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
    marginBottom: wp('3%'),
    marginTop: - wp('5%'),
  },
  titleContainer: {
    marginBottom: wp('5%'),
  },
  routineListContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: wp('3%'),
    flexWrap: "wrap",

  },
  addRoutineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
