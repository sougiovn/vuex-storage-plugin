import Cookies from 'js-cookie';

const CookiesWrapper = {
  setItem: Cookies.set,
  getItem: Cookies.get,
  removeItem: Cookies.remove
};