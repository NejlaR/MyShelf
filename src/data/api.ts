import type { Book } from '@/components/BookCard';

import { books } from './books';

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchBooks(
  options: { fail?: boolean } = {}
): Promise<Book[]> {
  await wait(800);

  if (options.fail) {
    throw new Error('Could not load books');
  }

  return books;
}