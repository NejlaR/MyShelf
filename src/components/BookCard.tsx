import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Book } from '@/types';

type BookCardProps = {
  book: Book;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function BookCard({
  book,
  style,
  onPress,
  onLongPress,
}: BookCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${book.title}, ${book.author}, ${book.status}`}
      accessibilityHint="Opens book details. Long press to delete."
      android_ripple={{ color: theme.border }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: book.photoUrl }}
          style={styles.photo}
          accessibilityLabel={`Cover of ${book.title}`}
          resizeMode="cover"
        />

        <View style={styles.badgeRow}>
          <Text
            style={[
              styles.badge,
              {
                backgroundColor: theme.primary,
                color: theme.onPrimary,
              },
            ]}
          >
            {book.status}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {book.title}
        </Text>

        <Text style={[styles.author, { color: theme.muted }]}>
          {book.author}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.6,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    flexShrink: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    fontSize: FontSize.small,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  author: {
    fontSize: FontSize.body,
  },
});