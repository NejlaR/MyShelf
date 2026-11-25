import { StyleSheet, Text } from 'react-native';

import { ShelfScreen } from '@/components/shelf-screen';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ShelfScreen>
      <Text style={[styles.title, { color: theme.text }]}>
        About MyShelf
      </Text>

      <Text style={[styles.description, { color: theme.muted }]}>
        MyShelf is a personal book library and reading tracker.
        Browse your books, track reading statuses and view book details.
      </Text>
    </ShelfScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.hero,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.body,
    lineHeight: 26,
  },
});