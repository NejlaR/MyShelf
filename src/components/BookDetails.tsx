import { Image, StyleSheet, Text, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Book } from '@/types';

type Props = {
  book: Book;
};

export default function BookDetails({ book }: Props) {
  const theme = useTheme();

  const statistics = [
    { label: 'Status', value: book.status },
    { label: 'Pages', value: String(book.pages) },
    { label: 'Added', value: book.addedAt },
  ];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Image
        source={{ uri: book.photoUrl }}
        style={styles.photo}
        accessibilityLabel={`Cover of ${book.title}`}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {book.title}
        </Text>

        <Text style={[styles.author, { color: theme.muted }]}>
          {book.author}
        </Text>

        <Text style={[styles.label, { color: theme.muted }]}>
          ID: {book.id}
        </Text>

        <View style={styles.statistics}>
          {statistics.map((item) => (
            <View
              key={item.label}
              style={[
                styles.box,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.value, { color: theme.text }]}>
                {item.value}
              </Text>

              <Text style={[styles.label, { color: theme.muted }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Description
        </Text>

        <Text style={[styles.description, { color: theme.text }]}>
          {book.description?.trim() || 'No description for this book.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  author: {
    fontSize: FontSize.body,
  },
  statistics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  box: {
    flexGrow: 1,
    flexBasis: 120,
    padding: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  value: {
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    fontSize: FontSize.small,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.title,
    fontWeight: '600',
  },
  description: {
    fontSize: FontSize.body,
    lineHeight: 26,
  },
});