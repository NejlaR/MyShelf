export type Book = {
  id: string;
  title: string;
  author: string;
  status: 'Currently Reading' | 'Want to Read' | 'Finished';
  photoUrl: string;
  description: string;
  addedAt: string;
  pages: number;
};