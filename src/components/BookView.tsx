import { Link, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IBook } from 'types/books';
import { useState } from 'react';

export default function BookView({ book }: { book: IBook }) {

  const [imageWidth, setImageWidth] = useState(null);

  const handleImageLoad = (event: any) => {
    setImageWidth(event.target.width);
  }

  return (
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
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minWidth: 600
          }}
        >
          <img className="view-book-small-image" id="bookItemImage" src={book.icons.large} alt={book.title} onLoad={handleImageLoad}/>
          {imageWidth && (  // Only render the Box when the image width is available
          <Box maxWidth={600 - imageWidth}>
            <Typography className="view-books" variant="h5" sx={{marginLeft: 3}}>
              Title: {book.title}
            </Typography>
            <Typography className="view-books" variant="h5" sx={{marginLeft: 3}}>
              Author: {book.authors}
            </Typography>
            <Typography className="view-books" variant="h5" sx={{marginLeft: 3}}>
              ISBN: {book.isbn13}
            </Typography>
          </Box>
        )}
        </Box>
      </ListItemButton>
    </Box>
  );
}
