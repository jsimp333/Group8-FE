// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import { Link } from '@mui/material';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return (
    <>
      <MainCard title="Welcome to Your Local Library Hub!">
        <Typography variant="body2">
          <Link href="/books/search">Search Books: </Link> Quickly find books by title, author, year, or ISBN. <br></br>
          <Link href="/books/add">Add Books: </Link> Provide to help the library grow by adding your own books. <br></br>
          <Link href="/books/browse">Browse Books: </Link>Browse all the books we have in our library <br></br>
        </Typography>
      </MainCard>
      <MainCard title="Meet the Team">
        <Typography>
        </Typography>
      </MainCard>
    </>
  );
}
