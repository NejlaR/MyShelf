import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
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
import EmptyState from '@/components/EmptyState';
import FilterChip from '@/components/FilterChip';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchBooks } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { Book } from '@/types';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type Filter = 'All' | Book['status'];

const filters: Filter[] = [
  'All',
  'Currently Reading',
  'Want to Read',
  'Finished',
];

export default function MyShelfScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [filter, setFilter] = useState<Filter>('All');

  const hydrated = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot
  );

  useEffect(() => {
    let ignore = false;

    async function load() {
  try {
    const result = await fetchBooks();

    if (!ignore) {
      setBooks(result);
      setError('');
      setStatus('ready');
    }
  } catch {
    if (!ignore) {
      setError('Could not load books');
      setStatus('error');
    }
  }
}

    void load();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setError('');
    setAttempt((value) => value + 1);
  }

  async function refresh() {
    if (refreshing || status !== 'ready') return;

    setRefreshing(true);
    setError('');

    try {
      const result = await fetchBooks();
      setBooks(result);
    } catch {
      setError('Could not refresh books. Pull down to try again.');
    } finally {
      setRefreshing(false);
    }
  }

  const screenWidth = hydrated ? width : 360;
  const columns = screenWidth >= 900 ? 3 : screenWidth >= 600 ? 2 : 1;

  const cardWidth = Math.max(
    0,
    (contentWidth - (columns - 1) * Spacing.md) / columns
  );

  const totals = books.reduce(
    (sum, book) => ({
      total: sum.total + 1,
      reading: sum.reading + (book.status === 'Currently Reading' ? 1 : 0),
      finished: sum.finished + (book.status === 'Finished' ? 1 : 0),
    }),
    { total: 0, reading: 0, finished: 0 }
  );

  const statistics = [
    { label: 'Books', value: totals.total },
    { label: 'Reading', value: totals.reading },
    { label: 'Finished', value: totals.finished },
  ];

  const visibleBooks =
    filter === 'All'
      ? books
      : books.filter((book) => book.status === filter);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <FlatList
        key={columns}
        style={styles.screen}
        data={visibleBooks}
        refreshing={refreshing}
        onRefresh={refresh}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        keyExtractor={(book) => book.id}
        renderItem={({ item }) => (
          <BookCard book={item} style={{ width: cardWidth }} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Spacing.md + insets.bottom },
        ]}
        ListHeaderComponent={
          <View
            onLayout={(event) => {
              setContentWidth(event.nativeEvent.layout.width);
            }}
          >
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
              {statistics.map((item) => (
                <View
                  key={item.label}
                  style={[
                    styles.summaryBox,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text style={[styles.number, { color: theme.primary }]}>
                    {item.value}
                  </Text>

                  <Text style={[styles.label, { color: theme.muted }]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.filters}>
              {filters.map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  selected={filter === item}
                  onPress={() => setFilter(item)}
                />
              ))}
            </View>

            {status === 'ready' && error !== '' && (
              <Text style={[styles.notice, { color: theme.text }]}>
                {error}
              </Text>
            )}
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={
          <View style={styles.empty}>
            {status === 'loading' ? (
              <View style={styles.stateBox}>
                <ActivityIndicator size="large" color={theme.primary} />

                <Text style={[styles.message, { color: theme.muted }]}>
                  Loading books...
                </Text>
              </View>
            ) : status === 'error' ? (
              <View style={styles.stateBox}>
                <Text style={[styles.errorTitle, { color: theme.text }]}>
                  {error}
                </Text>

                <Pressable
                  onPress={retry}
                  accessibilityRole="button"
                  style={[styles.button, { backgroundColor: theme.primary }]}
                >
                  <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
                    Try again
                  </Text>
                </Pressable>
              </View>
            ) : (
              <EmptyState
                title={
                  books.length === 0
                    ? 'No books yet'
                    : `No books with status "${filter}"`
                }
                message={
                  books.length === 0
                    ? 'Your books will appear here.'
                    : 'Choose another reading status.'
                }
              />
            )}
          </View>
        }
        ListFooterComponent={
          status === 'ready' ? (
            <View style={[styles.button, { backgroundColor: theme.primary }]}>
              <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
                + Add Book
              </Text>
            </View>
          ) : undefined
        }
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  row: { gap: Spacing.md },
  header: { marginBottom: Spacing.md },
  footer: { marginTop: Spacing.lg },
  separator: { height: Spacing.md },
  empty: { flex: 1 },
  stateBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  logo: {
    fontSize: FontSize.title,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  heading: { fontSize: FontSize.hero, fontWeight: '700' },
  subtitle: {
    fontSize: FontSize.body,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  summaryRow: { flexDirection: 'row', gap: Spacing.sm },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
    gap: Spacing.xs,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  number: { fontSize: FontSize.hero, fontWeight: '700' },
  label: { fontSize: FontSize.small, textAlign: 'center' },
  message: { fontSize: FontSize.body, textAlign: 'center' },
  errorTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  notice: { fontSize: FontSize.body, marginTop: Spacing.md },
  button: { padding: Spacing.md, borderRadius: Radius.md },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});