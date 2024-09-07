import { Feather } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { ThemedText } from '@/components/input/ThemedText';
import { ThemedTextInput } from '@/components/input/ThemedTextInput';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRoutines } from '@/hooks/useRoutines';

// Types
import { Timing, RoutineStep } from '@/constants/Types';
export type RoutineTimingDetailCardProps = {
    timing: Timing;
    routineId: string;
    editMode?: boolean;
};

function RoutineTimingDetailCardRow({ orderBackgroundColor, orderTextColorName, order, itemType, itemBrand }: { orderBackgroundColor: string, orderTextColorName: string, order: number, itemType: string, itemBrand: string | null }) {
    const rowColors = ['background', 'tableColor2'];
    const backgroundColorName = rowColors[order % rowColors.length];
    const backgroundColor = useThemeColor({}, backgroundColorName);

    return (
        <View style={[styles.row, { backgroundColor: backgroundColor }]}>
            <View style={[styles.stepOrder, { backgroundColor: orderBackgroundColor }]}>
                <ThemedText colorName={orderTextColorName} fontSize={wp('5.5%')} fontWeight="bold">{order}</ThemedText>
            </View>
            <View style={styles.stepText}>
                <ThemedText colorName='text' fontSize={wp('4%')}>{itemType}</ThemedText>
            </View>
            <View style={styles.stepText}>
                <ThemedText colorName='text' fontSize={wp('4%')}>{itemBrand}</ThemedText>
            </View>
        </View>
    );
}

function RoutineTimingDetailCardEditableRow({ orderBackgroundColor, orderTextColorName, timing, routineId, stepIndex, order, itemType, itemBrand
}: { orderBackgroundColor: string, orderTextColorName: string, timing: Timing, routineId: string, stepIndex: number, order: number, itemType: string, itemBrand: string | null }) {

    const rowColors = ['background', 'tableColor2'];
    const backgroundColorName = rowColors[order % rowColors.length];
    const backgroundColor = useThemeColor({}, backgroundColorName);

    const { updateRoutineStep } = useRoutines();

    const setItemType = (itemType: string) => {
        updateRoutineStep(routineId, timing, stepIndex, itemType);
    };

    const setItemBrand = (itemBrand: string) => {
        updateRoutineStep(routineId, timing, stepIndex, itemBrand);
    };

    return (
        <View style={[styles.row, { backgroundColor: backgroundColor }]}>
            <View style={[styles.stepOrder, { backgroundColor: orderBackgroundColor }]}>
                <ThemedText colorName={orderTextColorName} fontSize={wp('5.5%')} fontWeight="bold">{order}</ThemedText>
            </View>
            <View style={styles.stepText}>
                <ThemedTextInput placeholder="Product type..." value={itemType} onChangeText={setItemType} borderWidth={1} backgroundColorName='background' style={{ width: wp('30%') }} />
            </View>
            <View style={styles.stepText}>
                <ThemedTextInput placeholder="Brand..." value={itemBrand ? itemBrand : undefined} onChangeText={setItemBrand} borderWidth={1} backgroundColorName="background" style={{ width: wp('30%') }} />
            </View>
        </View>
    );
}

export function RoutineTimingDetailCard({
    timing,
    routineId,
    editMode,
    ...rest
}: RoutineTimingDetailCardProps) {
    const { routinesData } = useRoutines();
    const timingProperties = {
        Morning: { iconName: 'sunrise' },
        Noon: { iconName: 'sun' },
        Afternoon: { iconName: 'sunset' },
        Night: { iconName: 'moon' },
    };
    const headerTextColorName = 'tintPrimaryDarker';
    const headerColor = useThemeColor({}, 'tintPrimaryLighter');
    const headerTextColor = useThemeColor({}, headerTextColorName);
    const iconName = timingProperties[timing as Timing].iconName;

    return (
        <TouchableOpacity style={styles.cardContainer}>
            <View style={[styles.header, { backgroundColor: headerColor }]}>
                <Feather name={iconName} size={wp('7%')} color={headerTextColor} />
                <ThemedText colorName={headerTextColorName} fontSize={wp('6%')}>
                    {timing}
                </ThemedText>
            </View>
            {
                routinesData.routines[routineId].routineSteps[timing].map((step: RoutineStep, index: number) =>
                    editMode ? (
                        <RoutineTimingDetailCardEditableRow
                            key={index}
                            orderBackgroundColor={headerColor}
                            orderTextColorName={headerTextColorName}
                            timing={timing}
                            routineId={routineId}
                            stepIndex={index}
                            order={step.order}
                            itemType={step.itemType}
                            itemBrand={step.itemBrand}
                        />
                    ) : (
                        <RoutineTimingDetailCardRow
                            key={index}
                            orderBackgroundColor={headerColor}
                            orderTextColorName={headerTextColorName}
                            order={step.order}
                            itemType={step.itemType}
                            itemBrand={step.itemBrand}
                        />
                    )
                )
            }
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: wp('90%'),
        overflow: 'hidden', // table fits within the container's border radius
        borderRadius: wp('3%'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: wp('3%'),
        gap: wp('3%'),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepOrder:
    {
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp('3%'),
        marginRight: wp('8%'),
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('1%'),
    },
    stepText:
    {
        flex: 1,
    },
});