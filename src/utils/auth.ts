import Cookies from 'js-cookie';

export function setAuthCookie(isAuthenticated: boolean) {
  Cookies.set('isAuthenticated', isAuthenticated.toString(), {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}

export function getAuthCookie(): boolean {
  return Cookies.get('isAuthenticated') === 'true';
}

export function removeAuthCookie() {
  Cookies.remove('isAuthenticated');
}
