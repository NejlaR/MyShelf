import {
  DarkTheme,
  DefaultTheme,
  Link,
  Stack,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDark = colorScheme === 'dark';
  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.primary,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AnimatedSplashOverlay />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'MyShelf',
            headerRight: () => (
              <Link
                href="/about"
                style={{
                  color: theme.primary,
                  fontSize: FontSize.body,
                  fontWeight: '600',
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                }}
              >
                About
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="about"
          options={{
            title: 'About MyShelf',
          }}
        />

        <Stack.Screen
          name="book/[id]"
          options={{ title: '' }}
        />
      </Stack>
    </ThemeProvider>
  );
}