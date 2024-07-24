import { Tabs } from 'expo-router';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedHeader } from '@/components/navigation/Header';
import ProtectedRoute from '@/components/ProtectedRoute';

// Constants
import { Colors } from '@/constants/Colors';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProtectedRoute>
      <ThemedHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            borderTopWidth: wp('0.3%'),
            height: wp('20%'),
          },
          tabBarIconStyle: {
            width: wp('6%'),
            height: wp('6%'),
          },
          tabBarLabelStyle: {
            fontSize: wp('3.5%'),
            marginBottom: wp('3%'),
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
