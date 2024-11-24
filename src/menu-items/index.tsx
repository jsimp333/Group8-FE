// project import
import homePage from './home-page';
import other from './other';
import pages from './messages';
import books from './books';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [homePage, pages, books, other]
};

export default menuItems;
