import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BookDetails from '@/components/BookDetails';
import EmptyState from '@/components/EmptyState';
import { Spacing } from '@/constants/theme';
import { getBook } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const book = getBook(id);

  return (
    <>
      <Stack.Screen
        options={{
          title: book ? book.title : 'Book not found',
        }}
      />

      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: Spacing.md + insets.left,
            paddingRight: Spacing.md + insets.right,
            paddingBottom: Spacing.lg + insets.bottom,
          },
        ]}
      >
        {book ? (
          <BookDetails book={book} />
        ) : (
          <EmptyState
            title="Book not found"
            message="There is no book with this ID."
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: Spacing.md,
  },
});