'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';

import SendBook from 'sections/book-forms/bookSearch';
import { IBookResponse } from 'types/books';
import BookView from 'components/BookView';

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function AddBook() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const [results, setResults] = React.useState([] as IBookResponse[]);

  const onSuccess = (queryResults: IBookResponse[]) => {
    setAlert({
      showAlert: true, //TODO -> false, no alert shown on success
      alertMessage: 'Book search successful!',
      alertSeverity: 'success'
    });
    setResults(queryResults);
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book search not successful: ' + message,
      alertSeverity: 'error'
    });
  };

  return (
    <>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mt: 1 }}>
            <SendBook onSuccess={(q: IBookResponse[]) => onSuccess(q)} onError={onError} />
          </Box>
          <Box sx={{ mt: 3 }}>
            {results.map((book: IBookResponse) => (
              <BookView key={book.IBook.isbn13} book={book.IBook} />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}