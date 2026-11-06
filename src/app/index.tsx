import { useSyncExternalStore } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { BookCard } from '@/components/BookCard';
import { ShelfScreen } from '@/components/shelf-screen';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { books } from '@/data/books';
import { useTheme } from '@/hooks/use-theme';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MyShelfScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const hasHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const columns = hasHydrated
    ? width >= 900
      ? 3
      : width >= 600
        ? 2
        : 1
    : 1;

  const summary = books.reduce(
    (result, book) => ({
      total: result.total + 1,
      reading:
        result.reading + (book.status === 'Currently Reading' ? 1 : 0),
      finished:
        result.finished + (book.status === 'Finished' ? 1 : 0),
    }),
    { total: 0, reading: 0, finished: 0 }
  );

  const statistics = [
    { label: 'Books', value: summary.total },
    { label: 'Reading', value: summary.reading },
    { label: 'Finished', value: summary.finished },
  ];

  const cardWidth =
    columns === 3
      ? '33.333333%'
      : columns === 2
        ? '50%'
        : '100%';

  return (
    <ShelfScreen>
      <Text style={[styles.logo, { color: theme.primary }]}>
        MyShelf
      </Text>

      <Text style={[styles.heading, { color: theme.text }]}>
        My Books
      </Text>

      <Text style={[styles.subtitle, { color: theme.muted }]}>
        Your little library.
      </Text>

      <View style={styles.summaryRow}>
        {statistics.map((statistic) => (
          <View
            key={statistic.label}
            style={[
              styles.summaryBox,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={[styles.summaryNumber, { color: theme.primary }]}
            >
              {statistic.value}
            </Text>

            <Text
              style={[styles.summaryLabel, { color: theme.muted }]}
            >
              {statistic.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {books.map((book) => (
          <View
            key={book.id}
            style={[styles.cardSlot, { width: cardWidth }]}
          >
            <BookCard book={book} style={styles.bookCard} />
          </View>
        ))}
      </View>

      <View
        style={[
          styles.button,
          { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={[styles.buttonText, { color: theme.onPrimary }]}
        >
          + Add Book
        </Text>
      </View>
    </ShelfScreen>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: FontSize.title,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  heading: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FontSize.body,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
    gap: Spacing.xs,
  },
  summaryNumber: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: FontSize.small,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.sm,
  },
  cardSlot: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  bookCard: {
    width: '100%',
    flex: 1,
  },
  button: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});