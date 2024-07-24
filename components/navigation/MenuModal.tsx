import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';

export const MenuModal = ({ modalVisible, setModalVisible, iconColor }) => {
    const iconName = 'close-outline';
    const borderBottomColor = useThemeColor({}, 'tintNeutralLighter');
    const backgroundColor = useThemeColor({}, 'background');

    const { signOut } = useAuth();
    const menuOptions = [
        {
            id: '1', title: 'Sign Out', action: async () => {
                await signOut();
                Alert.alert('Signed out', 'You have been signed out successfully.');
            }
        },
        // Add more menu options here
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor }]}
            onPress={async () => {
                await item.action();
                setModalVisible(false);
            }}
        >
            <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={[styles.modalContainer, { backgroundColor }]}>
                <View style={[styles.modalHeader, { borderBottomColor: iconColor }]}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(false)}>
                        <Ionicons name={iconName} size={wp('9%')} color={iconColor} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={menuOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.menuList}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modalHeader: {
        paddingTop: wp('13%'),
        paddingBottom: wp('3%'),
        borderBottomWidth: wp('0.4%'),
    },
    menuButton: {
        paddingRight: wp('7%'),
        marginLeft: 'auto',

    },
    menuList: {
        paddingTop: wp('3%'),
    },
    menuItem: {
        padding: wp('5%'),
        borderBottomWidth: wp('0.2%'),
    },
    menuItemText: {
        fontSize: wp('5%'),
    },
});
