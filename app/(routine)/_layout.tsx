import { Stack } from 'expo-router';
import React from 'react';

export default function RoutineLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="editable_routine"
            />
            <Stack.Screen
                name="viewable_routine"
            />
        </Stack>
    );
}