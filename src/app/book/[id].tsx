import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BookDetails from '@/components/BookDetails';
import EmptyState from '@/components/EmptyState';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { getBook } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const book = getBook(id);

  function backToList() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

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

        <Pressable
          onPress={backToList}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Back to the list
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: Spacing.md,
    gap: Spacing.lg,
  },
  button: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});