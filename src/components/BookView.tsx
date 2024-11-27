import { Link, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IBook } from 'types/books';

export default function BookView({ book }: { book: IBook }) {
  return (
    <Box
      sx={{
        marginTop: 8,
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
          borderWidth: 3
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minWidth: 600
          }}
        >
          <img src={book.icons.large} alt={book.title} />
          <Box>
            <Typography>Title: {book.title}</Typography>
            <Typography>Author: {book.authors}</Typography>
            <Typography>ISBN: {book.isbn13}</Typography>
          </Box>
        </Box>
      </ListItemButton>
    </Box>
  );
}
