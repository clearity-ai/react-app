import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedView } from '@/components/ThemedView';
import { MenuModal } from '@/components/navigation/MenuModal';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

const defaultProfilePicture = require('@/assets/images/default-profile-picture.png');

export const TabsHeader = () => {
    const iconColor = useThemeColor({}, 'tabIconDefault'); //tabIconDefault
    const iconName = 'menu-outline';
    const [profilePicture, setProfilePicture] = useState({ uri: defaultProfilePicture });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const profilePictureUri = await AsyncStorage.getItem('profilePicture');
                if (profilePictureUri) {
                    setProfilePicture(JSON.parse(profilePictureUri));
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, []);

    return (
        <ThemedView style={styles.headerContainer}>
            <TouchableOpacity style={styles.profileContainer}>
                <Image
                    source={profilePicture}
                    style={styles.profilePicture}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                <Ionicons name={iconName} size={wp('10%')} color={iconColor} />
            </TouchableOpacity>
            <MenuModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingTop: wp('8%'),
        paddingBottom: wp('3%'),
    },
    profileContainer: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('12%'),
        overflow: 'hidden',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
    },
    menuButton: {
        padding: wp('2%'),
    },
});
