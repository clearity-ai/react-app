import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'sign in',
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    title: 'sign up',
                }}
            />
        </Stack>
    );
}