'use client';

import axios from 'utils/axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IBook } from 'types/books';
import { BookCover } from 'book-cover-3d';
import { Box, Container, Stack } from '@mui/system';
import { Link, List, ListItem, Rating, Typography } from '@mui/material';
import { numberWithCommas } from 'utils/design-utils';

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
    <Container>
      {book === undefined && (
        <>
          <Typography variant="h1">Loading...</Typography>
        </>
      )}
      {book === null && (
        <>
          <Typography variant="h1">Book not found</Typography>
          <Link href="/books/search">Go search for books</Link>
        </>
      )}
      {book && (
        <Container sx={{mt: 3}}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ mt: 10 }}>
              <BookCover
                rotate={20}
                rotateHover={60}
                transitionDuration={3}
                thickness={bookWidths[book.isbn13 % bookWidths.length]}
                bgColor="#333"
              >
                <img src={book.icons.large} alt={book.title} />
              </BookCover>
            </Box>
            <Stack direction="column" spacing={2} sx={{ pl: 4}}>
              <Typography variant="h2">{book.title}</Typography>
              
              {/* <Typography variant="h6" sx={{mt: 5}}>Author{book.authors.split(', ').length > 1 && "s"}</Typography> */}
              
              <List sx={{ mt: 0, display: 'flex', flexDirection: 'row', padding: 0, gap: 1, justifyContent: 'flex-start'}}>
                <ListItem key={0} sx={{width: 'auto', padding: 0}}>
                  <Typography>By </Typography>
                </ListItem>
                {book.authors.split(', ').map((author) => {
                  return (
                    <ListItem key={author} sx={{width: 'auto', padding: 0}}>
                      <Link href={`/books/search?author=${author}`}>{author}</Link>
                      {book.authors.split(', ').indexOf(author) < book.authors.split(', ').length - 1 && ', '}
                    </ListItem>
                  );
                })}
              </List>
              <Stack direction="row" spacing={2}>
                <Rating defaultValue={book.ratings.average} precision={0.1} readOnly />
                <Typography>({numberWithCommas(book.ratings.count)} ratings)</Typography>
              </Stack>
              <Typography>Publication Year: {book.publication}</Typography>
              </Stack>
          </Stack>
        </Container>
      )}
    </Container>
  );
}
