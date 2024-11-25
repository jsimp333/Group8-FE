// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HomeIcon from '@mui/icons-material/Home';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { HomeIcon };

// ==============================|| MENU ITEMS - HOME PAGE ||============================== //

const homePage: NavItemType = {
  id: 'home-page',
  title: <FormattedMessage id="Home Page" />,
  type: 'group',
  url: '/home-page',
  icon: icons.HomeIcon
};

export default homePage;
