import React, { useState } from 'react';
import { StyleSheet, View, type TextInputProps, } from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedDatePickerProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    date: dayjs.Dayjs;
    setDate: (date: dayjs.Dayjs) => void;
};

export function ThemedDatePicker({ style,
    lightColor,
    darkColor,
    date,
    setDate,
    ...rest }: ThemedDatePickerProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'Background');
    const tint = useThemeColor({}, 'tint');
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
    });

    const onDateSelect = (params) => {
        setDate(params.date);
        console.log("Date selected: ", params.date);
    }

    return (
        <View style={styles.container}>
            <DateTimePicker
                mode="single"
                date={date}
                onChange={onDateSelect}
                selectedItemColor={tint}
            />
        </View>
    );
}