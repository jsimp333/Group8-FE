// third-party
import { FormattedMessage } from 'react-intl';

// assets
import LibraryIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BookIcon, SearchIcon, LibraryIcon, MenuBookIcon };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-book-pages',
  title: <FormattedMessage id="book-pages" />,
  type: 'group',
  children: [
    {
      id: 'books',
      title: <FormattedMessage id="books" />,
      type: 'collapse',
      icon: icons.LibraryIcon,
      children: [
        {
          id: 'browse-books',
          title: <FormattedMessage id="browse-books" />,
          type: 'item',
          url: '/books/browse',
          icon: icons.MenuBookIcon
        },
        {
          id: 'add-book',
          title: <FormattedMessage id="add-book" />,
          type: 'item',
          url: '/books/add',
          icon: icons.BookIcon
        },
        {
          id: 'search-books',
          title: <FormattedMessage id="search-book" />,
          type: 'item',
          url: '/books/search',
          icon: icons.SearchIcon
        }
      ]
    }
  ]
};

export default pages;
