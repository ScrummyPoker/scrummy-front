import { eraseCookie, setCookie, readCookie } from '../utils/cookies';
import { ROUTE_AUTH_LOGIN } from '../utils/routes';
import {
  SCRUM_USER,
  SCRUM_USER_TOKEN,
  SCRUM_USER_REFRESH_TOKEN,
} from '../utils/cookies';

export function loginUser(user) {
  setCookie(SCRUM_USER, {
    id: user.id,
    email: user.email,
    name: user.name
  });

  setCookie(SCRUM_USER_TOKEN, user.accessToken);
  setCookie(SCRUM_USER_REFRESH_TOKEN, user.refreshToken);
}

export function logoutUser(user) {
  //erase cookies
  eraseCookie(SCRUM_USER);
  eraseCookie(SCRUM_USER_TOKEN);
  eraseCookie(SCRUM_USER_REFRESH_TOKEN);
  window.location.href = ROUTE_AUTH_LOGIN;
}

export function isLoggedIn() {
  const userCookie = readCookie(SCRUM_USER);
  return !!userCookie;
}

export function getUserLogged() {
  return isLoggedIn() && readCookie(SCRUM_USER);
}

export function getUserToken() {
  return isLoggedIn() && readCookie(SCRUM_USER_TOKEN);
}

export default {
  loginUser,
  logoutUser,
  isLoggedIn,
  getUserToken,
};
