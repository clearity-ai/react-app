import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Components
import { MenuModal } from '@/components/navigation/MenuModal';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

const defaultProfilePicture = require('@/assets/images/default-profile-picture.png');

export const ThemedHeader = () => {
    const iconColor = useThemeColor({}, 'text');
    const iconName = 'menu-outline';
    const backgroundColor = useThemeColor({}, 'background');
    const [profilePicture, setProfilePicture] = useState({ uri: defaultProfilePicture });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const profilePictureUri = await AsyncStorage.getItem('profilePicture');
                console.log('profilePictureUri', profilePictureUri);
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
        <View style={[styles.headerContainer, { backgroundColor }]}>
            <TouchableOpacity style={styles.profileContainer}>
                <Image
                    source={profilePicture}
                    style={styles.profilePicture}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                <Ionicons name={iconName} size={wp('9%')} color={iconColor} />
            </TouchableOpacity>
            <MenuModal modalVisible={modalVisible} setModalVisible={setModalVisible} iconColor={iconColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingTop: wp('11%'),
        paddingBottom: wp('3%'),
    },
    profileContainer: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
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
