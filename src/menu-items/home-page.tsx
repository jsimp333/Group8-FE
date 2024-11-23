// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ChromeOutlined from '@ant-design/icons/ChromeOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { ChromeOutlined };

// ==============================|| MENU ITEMS - HOME PAGE ||============================== //

const homePage: NavItemType = {
  id: 'home-page',
  title: <FormattedMessage id="Home page" />,
  type: 'group',
  url: '/home-page',
  icon: icons.ChromeOutlined
};

export default homePage;
