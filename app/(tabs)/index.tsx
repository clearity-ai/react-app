import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

// Components
import { ThemedView } from '@/components/ThemedView';
import { ScreenTitle } from '@/components/navigation/ScreenTitle';
import { ThemedCheckin } from '@/components/checkin/ThemedCheckin';
import { InfoCard } from '@/components/InfoCard';
import { TipCard } from '@/components/TipCard';

// Constants
import { infoCardData, tipCardData } from '@/constants/Values';

export default function HomeScreen() {
  const router = useRouter();

  const onCheckinPress = () => {
    // Navigate to the checkin screens
    router.navigate('(checkin)');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <>
        <ThemedView style={styles.mainContainer}>
          <ScreenTitle title="Home" />
          <ThemedCheckin onPress={onCheckinPress} />
          <ThemedView style={styles.infoContainer}>
            {infoCardData.map((item, index) => {
              return <InfoCard
                key={index}
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
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: wp('4%'),
    marginTop: wp('4%'),
    flexWrap: "wrap",
  },
  tipContainer: {
    marginTop: wp('4%'),
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    elevation: 5, // For Android shadow
    zIndex: 1, // card is above other content
  },
});
