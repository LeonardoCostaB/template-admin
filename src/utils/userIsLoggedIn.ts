'use client';

export function userIsLoggedIn() {
   if (document.cookie.includes('isLoggedIn')) {
      window.location.href = '/';
   }
}
