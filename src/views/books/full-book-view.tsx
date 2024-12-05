'use client';

import axios from 'utils/axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { IBook } from 'types/books';
import { BookCover } from 'book-cover-3d';
import { Box, Container, Divider, Stack, Button, Checkbox, Rating, Typography, Link, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { numberWithCommas } from 'utils/design-utils';
import EditIcon from '@mui/icons-material/Edit';
import EditBook from 'sections/book-forms/bookEdit';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Alert } from '@mui/material';

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
};

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

const bookWidths = [30, 40, 50, 60, 70, 80, 90, 100];

export default function FullBookView() {
  const queries = useSearchParams();
  const [book, setBook] = useState<undefined | null | IBook>(undefined); 
  const [value, setValue] = useState<number | null>(null);
  const [bookID, setID] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const onError = (message:string) => {
    setAlert({
      showAlert: true,
      alertMessage: message,
      alertSeverity: 'error'
    });
  };

  const onSuccess = (message:string) => {
    setAlert({
      showAlert: true,
      alertMessage: message,
      alertSeverity: 'success'
    });
  };
  useEffect(() => {
    if (!queries.has('isbn')) {
      setBook(null);
      setID(null);
      return;
    }
    // Fetch book details from the server using the `isbn` query parameter
    let route = `/book/isbn/${queries.get('isbn')}`;

    axios
      .get(route)
      .then((response) => {
        setBook(response.data.entries[0].IBook);
        setID(response.data.entries[0].id);
      })
      .catch((error) => {
        console.error(error);
        setBook(null);
      });
  }, [queries]);

  const handleDelete = () => {
    if (!book) return;
    if(window.confirm(`Are you sure you want to delete the book "${book.title}"`)) {
      axios
        .delete(`/book/isbn/${book.isbn13}`)
        .then(() => {
          setBook(null);
          onSuccess("Book Deleted!");
          window.history.back();
        })
        .catch((error) => {
          onError("Delete not successful, please try again or contact support.");
          console.error(error);
        });
    };
  }

  const handleSubmit = () => {
    if (value !== null && book) {
      setIsSubmitting(true);
        const ratingChanges = {
        rating_1_star: 0,
        rating_2_star: 0,
        rating_3_star: 0,
        rating_4_star: 0,
        rating_5_star: 0
      };
      if (value === 1) {
        ratingChanges.rating_1_star = 1;
      } else if (value === 2) {
        ratingChanges.rating_2_star = 1;
      } else if (value === 3) {
        ratingChanges.rating_3_star = 1;
      } else if (value === 4) {
        ratingChanges.rating_4_star = 1;
      } else if (value === 5) {
        ratingChanges.rating_5_star = 1;
      }
      axios
        .put(`/book/rate/${bookID}`, ratingChanges)
        .then(() => {
          const newCount = book.ratings.count + 1;
          const totalRatings = book.ratings.average * book.ratings.count + value;
          const newAverage = totalRatings / newCount;
          setBook({
            ...book,
            ratings: {
              ...book.ratings,
              average: newAverage,
              count: newCount
            }
          });
          onSuccess("Rating Updated");
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error(error);
          onError("Rating not successful, please try again or contact support.");
          setIsSubmitting(false);
        });
    }
  };
  return (
    <>
    {alert.showAlert && (
      <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
        {alert.alertMessage}
      </Alert>
    )}
    <Container>
      {book === undefined && <Typography variant="h1">Loading...</Typography>}
      {book === null && (
        <>
          <Typography variant="h1">Book not found</Typography>
          <Link href="/books/search">Go search for books</Link>
        </>
      )}
      {book && (
        <Container sx={{ mt: 3 }}>
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
            <Stack direction="column" spacing={2} sx={{ pl: 4 }}>
              {editing ? (
                <EditBook onSuccess={() => setEditing(false)} onError={(error) => console.error(error)} />
              ) : (
                <>
                  <Typography variant="h2">{book.title}</Typography>
                  <List
                    sx={{
                      mt: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 0,
                      gap: 1,
                      justifyContent: 'flex-start',
                    }}
                  >
                    <ListItem key={0} sx={{ width: 'auto', padding: 0 }}>
                      <Typography>By </Typography>
                    </ListItem>
                    {book.authors.split(', ').map((author, index) => (
                      <ListItem key={author} sx={{ width: 'auto', padding: 0 }}>
                        <Link href={`/books/search?author=${author}`}>{author}</Link>
                        {index < book.authors.split(', ').length - 1 && ', '}
                      </ListItem>
                    ))}
                  </List>
                  <Stack direction="row" spacing={2}>
                    <Rating value={book.ratings.average} precision={0.1} readOnly />
                    <Typography>({numberWithCommas(book.ratings.count)} ratings)</Typography>
                  </Stack>
                  <Typography>Publication Year: {book.publication}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      ms: 3
                    }}
                  >
                    <Typography component="legend">Add a Rating</Typography>
                    <Rating value={value} onChange={(event, newValue) => setValue(newValue)} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting || value === null}
                      sx={{ mt: 2 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Box>
                </>
              )}
              <Divider>Admin Tools</Divider>
              <Stack direction="row" spacing={2}>
                <Checkbox
                  onChange={(event) => setEditing(event.target.checked)}
                  icon={<EditIcon sx={{ width: 20 }} />}
                  checkedIcon={<NotInterestedIcon color="action" sx={{ width: 20 }} />}
                />
                <IconButton aria-label="delete" color="error" onClick={handleDelete} sx={{ alignSelf: 'flex-start', mt: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Container>
    </>
  );
}