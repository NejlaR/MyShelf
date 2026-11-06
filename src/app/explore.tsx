import { Image, StyleSheet, Text, View } from 'react-native';

import { ShelfScreen } from '@/components/shelf-screen';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { books } from '@/data/books';
import { useTheme } from '@/hooks/use-theme';

export default function BookDetailsScreen() {
  const theme = useTheme();
  const book = books[0];

  if (!book) {
    return (
      <ShelfScreen>
        <Text style={{ color: theme.text }}>
          No book available.
        </Text>
      </ShelfScreen>
    );
  }

  const details = [
    { label: 'Author', value: book.author },
    { label: 'Status', value: book.status },
  ];

  return (
    <ShelfScreen>
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
            <Text style={[styles.title, { color: theme.text }]}>
              {book.title}
            </Text>

            {details.map((detail) => (
              <View
                key={detail.label}
                style={[
                  styles.detailRow,
                  { borderBottomColor: theme.border },
                ]}
              >
                <Text
                  style={[styles.label, { color: theme.muted }]}
                >
                  {detail.label}
                </Text>

                <Text
                  style={[styles.value, { color: theme.text }]}
                >
                  {detail.value}
                </Text>
              </View>
            ))}

            <Text
              style={[styles.description, { color: theme.text }]}
            >
              {book.description}
            </Text>
          </View>
        </View>
      </View>
    </ShelfScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  heading: {
    fontSize: FontSize.hero,
    fontWeight: '700',
    marginBottom: Spacing.lg,
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
  title: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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