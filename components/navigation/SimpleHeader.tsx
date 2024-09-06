import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/input/ThemedText';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

// Types
import { UnknownFunction } from '@/constants/Types';
export type SimpleHeaderProps = {
    title: string;
    onClose: () => void;
    onClick?: UnknownFunction;
    clickIconName?: string;
};


export function SimpleHeader(
    {
        title,
        onClose,
        onClick,
        clickIconName,
        ...rest
    }: SimpleHeaderProps) {
    const closeIconColor = useThemeColor({}, 'tabIconDefault'); //tabIconDefault
    const closeIconName = 'close-outline';
    const clickIconColor = useThemeColor({}, 'tint');

    return (
        <ThemedView style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose} style={{ marginLeft: -wp('4%') }}>
                <Ionicons name={closeIconName} size={wp('8%')} color={closeIconColor} />
            </TouchableOpacity>
            <ThemedText style={styles.title} colorName='text' fontSize={wp('6%')} fontWeight='semibold'>{title}</ThemedText>
            {onClick && clickIconName && (
                <TouchableOpacity onPress={onClick} style={{ marginRight: -wp('4%') }}>
                    <Ionicons name={clickIconName} size={wp('8%')} color={clickIconColor} />
                </TouchableOpacity>
            )}
        </ThemedView >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
        paddingTop: wp('12%'),
        paddingBottom: wp('3%'),
    },
    title: {
        flex: 1,
        textAlign: 'center',
    },
});
