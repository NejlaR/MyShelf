import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Page not found' }} />

      <View
        style={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Page not found
        </Text>

        <Text style={[styles.message, { color: theme.muted }]}>
          This address does not exist.
        </Text>

        <Link
          href="/"
          replace
          style={[
            styles.button,
            {
              backgroundColor: theme.primary,
              color: theme.onPrimary,
            },
          ]}
        >
          Back to the list
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});