import { useSyncExternalStore } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { BookCard } from '@/components/BookCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { books } from '@/data/books';
import { useTheme } from '@/hooks/use-theme';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MyShelfScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const hasHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const screenWidth = hasHydrated ? width : 360;

  const columns =
    screenWidth >= 900 ? 3 : screenWidth >= 600 ? 2 : 1;

  const availableWidth =
    screenWidth - insets.left - insets.right;

  const cardWidth = Math.max(
    0,
    (
      availableWidth -
      2 * Spacing.md -
      (columns - 1) * Spacing.md
    ) / columns
  );

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

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <FlatList
        key={columns}
        style={styles.list}
        data={books}
        numColumns={columns}
        columnWrapperStyle={
          columns > 1 ? styles.columnRow : undefined
        }
        keyExtractor={(book) => book.id}
        renderItem={({ item }) => (
          <BookCard book={item} style={{ width: cardWidth }} />
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Spacing.md + insets.bottom },
        ]}
        ListHeaderComponent={
          <View>
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
                    style={[
                      styles.summaryNumber,
                      { color: theme.primary },
                    ]}
                  >
                    {statistic.value}
                  </Text>

                  <Text
                    style={[
                      styles.summaryLabel,
                      { color: theme.muted },
                    ]}
                  >
                    {statistic.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={
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
        }
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  columnRow: {
    gap: Spacing.md,
  },
  header: {
    marginBottom: Spacing.md,
  },
  footer: {
    marginTop: Spacing.lg,
  },
  separator: {
    height: Spacing.md,
  },
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
  button: {
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});