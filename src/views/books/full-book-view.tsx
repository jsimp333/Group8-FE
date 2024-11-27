'use client';

import axios from 'utils/axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IBook } from 'types/books';
import { BookCover } from 'book-cover-3d';
import { hash } from 'crypto';

const bookWidths = [30, 40, 50, 60, 70, 80, 90, 100];

export default function FullBookView() {
  const queries = useSearchParams();
  const [book, setBook] = useState<undefined | null | IBook>(undefined); // undefined: loading, null: not found, book: found

  useEffect(() => {
    if (!queries.has('isbn')) {
      setBook(null);
      return;
    }
    // Fetch book details from the server using the `isbn` query parameter
    let route = `/book/isbn/${queries.get('isbn')}`;

    axios
      .get(route)
      .then((response) => {
        console.log(response.data);
        setBook(response.data.entries[0].IBook);
      })
      .catch((error) => {
        console.error(error);
        setBook(null);
      });
  }, [queries]);

  return (
    <div>
      <h1>Full Book View</h1>
      {book === undefined && <p>Loading...</p>}
      {book === null && <p>Book not found</p>}
      {book && (
        <>
          <BookCover
            rotate={10}
            rotateHover={60}
            transitionDuration={3}
            thickness={bookWidths[book.isbn13 % bookWidths.length]}
            bgColor="#1e3a8a"
          >
            <img src={book.icons.large} alt={book.title} />
          </BookCover>

          <h2>{book.title}</h2>
          <p>{book.authors}</p>
          <p>{book.publication}</p>
          <p>{book.series_info?.name}</p>
        </>
      )}
    </div>
  );
}
