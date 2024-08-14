import React from 'react';
import { ScrollView, Image, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedText } from '@/components/input/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedCheckin } from '@/components/input/ThemedCheckin';
import { InfoCard } from '@/components/InfoCard';
import { TipCard } from '@/components/TipCard';

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

  const lastRoutineName = "Simple Routine"
  const streakDays = 12
  const lastCheckinTime = "30"

  const infoCardData = [
    {
      backgroundColorName: "tint",
      foregroundColorName: "primaryButtonText",
      iconName: "shimmer",
      infoTitleText: "Last Routine",
      infoMainText: lastRoutineName,
      infoUnitText: "",
      infoDetailText: "used in check-in"
    },
    {
      backgroundColorName: "tintPrimaryLighter",
      foregroundColorName: "tintPrimaryDarker",
      iconName: "progress-check",
      infoTitleText: "Progress Tracking",
      infoMainText: streakDays.toString(),
      infoUnitText: "days in a row",
      infoDetailText: "updated " + lastCheckinTime + " mins ago"
    },
  ]

  const tipCardData = {
    imageURI: "https://picsum.photos/200/400",
    tipTitleText: "Skincare Tip #312",
    tipMainText: "Less is more when it comes to skin care. Using too many products can irritate your skin. Instead, focus on the basics, such as a gentle cleanser, sunscreen, and moisturizer.",
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
          <ThemedView style={styles.infoContainer}>
            {infoCardData.map((item, index) => {
              return <InfoCard
                backgroundColorName={item.backgroundColorName}
                foregroundColorName={item.foregroundColorName}
                iconName={item.iconName}
                infoTitleText={item.infoTitleText}
                infoMainText={item.infoMainText}
                infoUnitText={item.infoUnitText}
                infoDetailText={item.infoDetailText}
              />;
            })}
          </ThemedView>
          <ThemedView style={styles.tipContainer}>
            <TipCard
              imageURI={tipCardData.imageURI}
              tipTitleText={tipCardData.tipTitleText}
              tipMainText={tipCardData.tipMainText}
            />
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
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp('4%'),
    flexWrap: "wrap",
  },
  tipContainer: {
    marginTop: wp('4%'),
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'),
    elevation: 5, // For Android shadow
    zIndex: 1, // card is above other content
  },
});
