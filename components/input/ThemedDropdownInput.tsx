import React, { useState } from 'react';
import { StyleSheet, Text, type TextInputProps, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedDropdownInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    items: { label: string, value: string }[];
    value: string;
    setValue: (value: string) => void;
    label: string;
};

export function ThemedDropdownInput({
    style,
    lightColor,
    darkColor,
    value,
    setValue,
    items,
    label,
    ...rest
}: ThemedDropdownInputProps) {
    const [isFocus, setIsFocus] = useState(false);
    const labelColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const tint = useThemeColor({}, 'tint');
    const placeholderTextColor = useThemeColor({}, 'textPlaceholder');

    const backgroundColor = useThemeColor({}, 'Background');

    const styles = StyleSheet.create({
        container: {
            backgroundColor: backgroundColor,
            padding: 0,
        },
        dropdown: {
            height: wp('9%'),
            borderColor: placeholderTextColor,
            borderWidth: wp('0.15%'),
            borderRadius: wp('2%'),
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },

        placeholderStyle: {
            fontSize: wp('4%'),
            color: placeholderTextColor,
        },
        selectedTextStyle: {
            fontSize: wp('4%'),
        },
        inputSearchStyle: {
            height: 40,
            fontSize: wp('4%'),
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: wp('3%'),
        },
    });

    const renderLabel = () => {
        return (
            <Text style={[styles.label, isFocus && { color: labelColor }]}>
                {label}
            </Text>
        );
    }
    // if label on top of dropdown needed add '{renderLabel()}' before '<Dropdown..'
    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: tint }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={items}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item...' : '...'
                }
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View>
    );


};

export default ThemedDropdownInput;