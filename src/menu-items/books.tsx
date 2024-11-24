// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { MessageOutlined, EmailIcon, SendIcon };

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
      icon: icons.MessageOutlined,
      children: [
        {
          id: 'add-book',
          title: <FormattedMessage id="add-book" />,
          type: 'item',
          url: '/books/add',
          icon: icons.SendIcon
        },
        {
          id: 'search-books',
          title: <FormattedMessage id="search-books" />,
          type: 'item',
          url: '/books/search',
          icon: icons.EmailIcon
        }
      ]
    }
  ]
};

export default pages;
