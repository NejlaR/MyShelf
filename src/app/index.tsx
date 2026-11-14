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

import { BookCard, type Book } from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchBooks } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type LoadStatus = 'loading' | 'error' | 'ready';

export default function MyShelfScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [contentWidth, setContentWidth] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [attempt, setAttempt] = useState(0);

  const hasHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    let ignore = false;

    async function loadBooks() {
      try {
        const result = await fetchBooks();

        if (!ignore) {
          setBooks(result);
          setErrorMessage('');
          setStatus('ready');
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Could not load books'
          );
          setStatus('error');
        }
      }
    }

    void loadBooks();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setErrorMessage('');
    setAttempt((current) => current + 1);
  }

  const screenWidth = hasHydrated ? width : 360;

  const columns =
    screenWidth >= 900 ? 3 : screenWidth >= 600 ? 2 : 1;

  const cardWidth = Math.max(
    0,
    (contentWidth - (columns - 1) * Spacing.md) / columns
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {status === 'loading' ? (
              <View style={styles.stateBox}>
                <ActivityIndicator
                  size="large"
                  color={theme.primary}
                  accessibilityLabel="Loading books"
                />

                <Text style={[styles.message, { color: theme.muted }]}>
                  Loading books...
                </Text>
              </View>
            ) : status === 'error' ? (
              <View style={styles.stateBox}>
                <Text
                  accessibilityRole="alert"
                  style={[styles.stateTitle, { color: theme.text }]}
                >
                  {errorMessage}
                </Text>

                <Pressable
                  onPress={retry}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: theme.primary },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.onPrimary },
                    ]}
                  >
                    Try again
                  </Text>
                </Pressable>
              </View>
            ) : (
              <EmptyState
                title="No books yet"
                message="Your books will appear here."
              />
            )}
          </View>
        }
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
          status === 'ready' ? (
            <View
              style={[
                styles.button,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.onPrimary },
                ]}
              >
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
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
  },
  stateBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  stateTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.body,
    textAlign: 'center',
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
  pressed: {
    opacity: 0.7,
  },
});