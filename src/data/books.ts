import type { Book } from '@/types';
export const books: Book[] = [
  {
    id: '1',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    status: 'Currently Reading',
    photoUrl: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg',
    description:
      'A little prince travels between planets and learns about friendship, love, and responsibility.',
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    status: 'Want to Read',
    photoUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    description:
      'Bilbo Baggins joins a group of dwarves on a journey to reclaim their home from a dragon.',
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    status: 'Finished',
    photoUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    description:
      'Elizabeth Bennet navigates family expectations, first impressions, and her changing feelings for Mr. Darcy.',
  },
    {
    id: '4',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
    status: 'Want to Read',
    photoUrl: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
    description:
      'Harry discovers that he is a wizard and begins his first year at Hogwarts, where he makes friends and uncovers a hidden mystery.',
  },
  {
    id: '5',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    status: 'Finished',
    photoUrl: 'https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg',
    description:
      'Katniss Everdeen volunteers to take her sister’s place in a televised survival competition.',
  },
];
