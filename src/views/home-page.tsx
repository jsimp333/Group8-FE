'use client'

// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import { Link } from '@mui/material';
import BookView from 'components/BookView';
import { useEffect, useState } from 'react';
import { fetchBookOfTheDay } from './books/bookOTD';
import { IBook } from 'types/books';

// ==============================|| HOME PAGE ||============================== //


export default function HomePage() {
  const [bookOfTheDay, setBookOfTheDay] = useState<IBook | null>(null);

  useEffect(() => {
    const getBookOfTheDay = async () => {
      const book = await fetchBookOfTheDay();
      setBookOfTheDay(book);
    };
    getBookOfTheDay();
  }, []);

  return (
    <>
      <MainCard title="Welcome to Your Local Library Hub!">
        <Typography variant="body2">
          <Link href="/books/search">Search Books: </Link> Quickly find books by title, author, year, or ISBN. <br></br>
          <Link href="/books/add">Add Books: </Link> Provide to help the library grow by adding your own books. <br></br>
          <Link href="/books/browse">Browse Books: </Link>Browse all the books we have in our library <br></br>
        </Typography>
      </MainCard>
      {bookOfTheDay && (
        <section className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Book of the Day</h2>
          <BookView key={bookOfTheDay.isbn13} book={bookOfTheDay} />
        </section>
      )}
    </>
  );
}
