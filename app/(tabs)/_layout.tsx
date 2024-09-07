import { Tabs } from 'expo-router';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TabsHeader } from '@/components/navigation/TabsHeader';
import ProtectedRoute from '@/components/ProtectedRoute';

// Constants
import { Colors } from '@/constants/Colors';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProtectedRoute>
      <TabsHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopRightRadius: wp('5%'),
            borderTopLeftRadius: wp('5%'),
            height: wp('20%'),
            padding: wp('3%'),
            // Shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: wp('1%') },
            shadowOpacity: 0.15,
            shadowRadius: wp('5%'),
            // Elevation for Android
            elevation: 10,

          },
          tabBarItemStyle: {
          },
          tabBarLabelStyle: {
            fontSize: wp('3.2%'),
            paddingTop: wp('4%'),
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="routine"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'infinite' : 'infinite-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
