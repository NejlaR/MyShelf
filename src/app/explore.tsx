import BookDetails from '@/components/BookDetails';
import EmptyState from '@/components/EmptyState';
import { ShelfScreen } from '@/components/shelf-screen';
import { books } from '@/data/books';

export default function BookDetailsScreen() {
  const book = books[0];

  return (
    <ShelfScreen>
      {book ? (
        <BookDetails book={book} />
      ) : (
        <EmptyState
          title="No book available"
          message="Book details will appear here."
        />
      )}
    </ShelfScreen>
  );
}