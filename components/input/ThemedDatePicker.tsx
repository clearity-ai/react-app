import React from 'react';
import { StyleSheet, View, type TextInputProps, } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedDatePickerProps = TextInputProps & {
    date: dayjs.Dayjs;
    setDate: (date: dayjs.Dayjs) => void;
};

export function ThemedDatePicker({ style,
    date,
    setDate,
    ...rest }: ThemedDatePickerProps) {
    const tint = useThemeColor({}, 'tint');

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginBottom: -wp('12%'),
    },
});