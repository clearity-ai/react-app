import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedText } from '@/components/input/ThemedText';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCheckin } from '@/hooks/useCheckin';

export type CheckinCardProps = {
    areaId: string | null;
};

export function CheckinCard({
    areaId,
    ...rest
}: CheckinCardProps) {
    const router = useRouter();
    const { checkinData } = useCheckin();
    const tint = useThemeColor({}, 'tint');
    const tintLighter = useThemeColor({}, 'tintPrimaryLighter');

    // Check if the areaId is valid
    if (!areaId || !checkinData.checkinAreas[areaId]) {
        return null;
    }

    const [photoSource, setPhotoSource] = useState({ uri: "https://picsum.photos/200/400" });
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
        // Set the photo source and user rating
        const newPhotoSource = checkinData.checkinAreas[areaId].pictureURI
            ? { uri: checkinData.checkinAreas[areaId].pictureURI }
            : typeof checkinData.checkinAreas[areaId].placeholderPictureURI === 'string'
                ? { uri: checkinData.checkinAreas[areaId].placeholderPictureURI }
                : checkinData.checkinAreas[areaId].placeholderPictureURI;
        const newUserRating = checkinData.checkinAreas[areaId].userRating ? checkinData.checkinAreas.userRating : null;
        setPhotoSource(newPhotoSource);
        setUserRating(newUserRating);
    }, [checkinData]);

    const onCheckinAreaPress = () => {
        // Navigate to the camera screen
        router.push({
            pathname: '(checkin)/camera',
            params: { areaId },
        });
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onCheckinAreaPress}>
            <ThemedText colorName='text' fontSize={wp('4.5%')} fontWeight="bold">{checkinData.checkinAreas[areaId].areaName}</ThemedText>
            <View style={styles.cardContent}>
                <View style={styles.verticalContainer}>
                    <Image source={photoSource} style={styles.picture} resizeMode="cover" />
                    <Ionicons name="camera" size={wp('6%')} color={tint} style={[styles.editIcon, { backgroundColor: tintLighter }]} />
                </View>
                <View style={styles.verticalContainer}>
                    <ThemedText colorName='text' fontSize={wp('4.5%')} fontWeight="semibold">Your Rating:</ThemedText>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: tint, height: wp('10%') }} >
                        {
                            userRating
                                ? <ThemedText colorName='background' fontSize={wp('4.5%')} fontWeight="bold">{userRating}</ThemedText>
                                : <ThemedText colorName='background' fontSize={wp('4.5%')} fontWeight="bold">n/a</ThemedText>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: wp('90%'),
        flexDirection: 'column',
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
        columnGap: wp('12%'),
        marginTop: wp('2%'),
    },
    picture: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('2%'),
        marginRight: wp('6%'),
        marginTop: wp('2%'),
    },
    verticalContainer: {
        rowGap: wp('2%'),
        borderColor: 'transparent', // Not sure why but without border layout breaks
        borderWidth: 1,
    },
    editIcon: {
        position: 'absolute',
        right: wp('4%'),
        borderRadius: wp('8%'),
        padding: wp('1.5%'),
        opacity: 0.6,
    },
});