import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { CheckinProvider } from '@/contexts/CheckinContext';
import { RoutinesProvider } from '@/contexts/RoutinesContext';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// Constants
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootContent() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(routine)" options={{ headerShown: false }} />
        <Stack.Screen name="(checkin)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RoutinesProvider>
        <CheckinProvider>
          <RootContent />
        </CheckinProvider>
      </RoutinesProvider>
    </AuthProvider>
  );
}