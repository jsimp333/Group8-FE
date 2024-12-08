import axios from 'utils/axios';
import { IBook } from 'types/books';

export const fetchBookOfTheDay = async (): Promise<IBook | null> => {
  try {
    const response = await axios.get('/book/rating/4.8'); 
    const books = response.data.entries.map((entry: { IBook: IBook }) => entry.IBook);

    if (books.length === 0) {
      console.warn('No books found with the specified rating.');
      return null;
    }

    // Use the current date to calculate an index
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const dateHash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = dateHash % books.length;

    return books[index]; // Return the book at the calculated index
  } catch (error) {
    console.error('Error fetching Book of the Day:', error);
    return null;
  }
};
