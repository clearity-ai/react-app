import React from 'react';
import { ScrollView, Image, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Themed components
import { ThemedText } from '@/components/input/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedCheckin } from '@/components/input/ThemedCheckin';

// Constants
import { Colors } from '@/constants/Colors';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

// Utils
import { getCurrentDate } from '@/utils/dates';


export default function HomeScreen() {
  const dateColorName = "textFaded"
  const iconColor = useThemeColor({}, dateColorName);

  const onCheckinPress = () => {
    console.log("Checkin pressed");
    // Navigate to the checkin screens
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <>
        <ThemedView style={styles.mainContainer}>
          <ThemedView style={styles.dateContainer}>
            <Ionicons name={'sunny'} size={wp('6%')} color={iconColor} />
            <ThemedText colorName={dateColorName}> {getCurrentDate()}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText fontSize={wp('8%')} fontWeight="bold">Home</ThemedText>
          </ThemedView>
          <ThemedCheckin onPress={onCheckinPress} />
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
});
