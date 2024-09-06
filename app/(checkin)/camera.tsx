import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { launchCamera } from 'react-native-image-picker';

// Components
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/input/ThemedButton';
import { SimpleHeader } from '@/components/navigation/SimpleHeader';

// Hooks
import { useCheckin } from '@/hooks/useCheckin';


export default function CameraScreen() {
    const router = useRouter();
    const { areaId } = useLocalSearchParams();
    const strAreaId = areaId ? String(areaId) : "";
    const { checkinData, updatePhoto } = useCheckin();
    const [photo, setPhoto] = useState(null);
    const headerTitle = checkinData.checkinAreas[strAreaId].areaName;

    const takeSelfie = () => {
        launchCamera(
            {
                mediaType: 'photo',
                cameraType: 'front',
                maxWidth: 200,
                maxHeight: 200,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                } else if (response.errorCode) {
                    console.log('Camera Error: ', response.errorMessage);
                    Alert.alert('Error', 'Failed to open camera.');
                } else {
                    const selectedPhoto = response.assets[0];
                    setPhoto({
                        uri: selectedPhoto.uri,
                        type: selectedPhoto.type,
                        name: selectedPhoto.fileName,
                    });
                    console.log('Photo taken: ', selectedPhoto);
                }
            }
        );
    };

    const onSaveCheckinArea = () => {
        if (!photo) {
            Alert.alert('Error', 'Please take a selfie to save.');
            return;
        }
        updatePhoto(strAreaId, photo);
        router.navigate('(checkin)');
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <SimpleHeader title={headerTitle} onClose={() => router.navigate('(checkin)')} onClick={onSaveCheckinArea} clickIconName='checkmark' />
                    <ThemedButton title="Take a Selfie" onPress={takeSelfie} />
                    {photo && <Image source={{ uri: photo.uri }} style={styles.photo} />}
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
    photo: {
        width: wp('50%'),
        height: wp('50%'),
        borderRadius: wp('25%'),
        marginTop: wp('5%'),
        alignSelf: 'center',
    },
});
