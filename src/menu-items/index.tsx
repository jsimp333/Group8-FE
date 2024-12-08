// project import
import homePage from './home-page';
import books from './books';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [homePage, books]
};

export default menuItems;
