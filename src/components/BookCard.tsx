import {
    Image,
    StyleSheet,
    Text,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Book = {
  id: string;
  title: string;
  author: string;
  status: 'Currently Reading' | 'Want to Read' | 'Finished';
  photoUrl: string;
  description: string;
};

type BookCardProps = {
  book: Book;
  style?: StyleProp<ViewStyle>;
};

export function BookCard({ book, style }: BookCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <View>
        <Image
          source={{ uri: book.photoUrl }}
          style={styles.photo}
          accessibilityLabel={`Cover of ${book.title}`}
          resizeMode="cover"
        />

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

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {book.title}
        </Text>

        <Text style={[styles.author, { color: theme.muted }]}>
          {book.author}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    maxWidth: '90%',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    fontSize: FontSize.small,
    fontWeight: '600',
    flexShrink: 1,
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