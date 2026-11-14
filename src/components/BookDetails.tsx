import { Image, StyleSheet, Text, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Book } from '@/types';

type Props = {
  book: Book;
};

export default function BookDetails({ book }: Props) {
  const theme = useTheme();

  const fields = [
    { label: 'ID', value: book.id },
    { label: 'Author', value: book.author },
    { label: 'Status', value: book.status },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme.text }]}>
        Book Details
      </Text>

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
          <Text style={[styles.heading, { color: theme.text }]}>
            {book.title}
          </Text>

          {fields.map((field) => (
            <View
              key={field.label}
              style={[styles.row, { borderBottomColor: theme.border }]}
            >
              <Text style={[styles.label, { color: theme.muted }]}>
                {field.label}
              </Text>

              <Text style={[styles.value, { color: theme.text }]}>
                {field.value}
              </Text>
            </View>
          ))}

          {book.description ? (
            <Text style={[styles.description, { color: theme.text }]}>
              {book.description}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    gap: Spacing.lg,
  },
  heading: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  card: {
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: FontSize.body,
    flexShrink: 1,
  },
  value: {
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  description: {
    fontSize: FontSize.body,
    lineHeight: 24,
  },
});