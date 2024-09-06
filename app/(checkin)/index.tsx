import React from 'react';
import { ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { launchCamera } from 'react-native-image-picker';

// Components
import { ThemedView } from '@/components/ThemedView';
import { SimpleHeader } from '@/components/navigation/SimpleHeader';
import { CheckinCard } from '@/components/checkin/CheckinCard';

// Hooks
import { useCheckin } from '@/hooks/useCheckin';

// Types
import { CheckinArea } from '@/constants/Types';

export default function CheckinScreen() {
    const router = useRouter();
    const { checkinData, pushCheckinData } = useCheckin();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <SimpleHeader title="Select Area" onClose={() => router.navigate('(tabs)')} onClick={pushCheckinData} clickIconName='checkmark' />
                    <ThemedView style={styles.checkinAreaListContainer}>
                        {Object.values(checkinData.checkinAreas as Record<string, CheckinArea>).map((item: CheckinArea, index: number) => {
                            return <CheckinCard
                                key={index}
                                areaId={item.areaId}
                            />;
                        })}
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
    checkinAreaListContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: wp('2%'),
        rowGap: wp('4%'),
        alignSelf: 'center',

    },
});
