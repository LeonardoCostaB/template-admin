import Cookies from 'js-cookie';

export function isLoggedIn(loggedIn: boolean) {
   loggedIn
      ? Cookies.set('isLoggedIn', `${loggedIn}`, { expires: 7 })
      : Cookies.remove('isLoggedIn');
}
