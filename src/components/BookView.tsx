import { Link, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IBook } from 'types/books';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Book from '@mui/icons-material/Book';

const defaultTheme = createTheme();

export default function BookView({ book }: { book: IBook }) {

  const [imageWidth, setImageWidth] = useState(null);

  const handleImageLoad = (event: any) => {
    setImageWidth(event.target.width);
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ListItemButton
          component={Link}
          href={`/books/view?isbn=${book.isbn13}`}
          sx={{
            border: 1,
            borderColor: 'primary.main',
            borderWidth: 3,
          }}
        >
          <Box
            sx={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: 600
            }}
          >
            <img className="view-book-small-image" id="bookItemImage" src={book.icons.large} alt={book.title} onLoad={handleImageLoad}/>
            {imageWidth && (  // Only render the Box when the image width is available
            <Box maxWidth={600 - imageWidth}>
              <BookItem item={`Title: ${book.title}`} />
              <BookItem item={`Authors: ${book.authors}`} />
              <BookItem item={`ISBN: ${book.isbn13}`} />
            </Box>
          )}
          </Box>
        </ListItemButton>
      </Box>
    </ThemeProvider>
  );

  function BookItem({ item } : { item: string }) {
    return (
      <Typography className="view-books" variant="h6" sx={{marginLeft: 3, fontWeight:"bold"}}>
        {item}
      </Typography>
    );
  }
}
