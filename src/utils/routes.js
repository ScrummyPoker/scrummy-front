export const ROUTE_HOME = '/';
export const ROUTE_AUTH_REGISTER = '/auth/register';
export const ROUTE_AUTH_LOGIN = '/auth/login';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_LOBBY = '/lobby/:lobbyCode';

export const buildURL = (routePath, { paramName, paramValue }) =>
  routePath.replace(`:${paramName}`, paramValue);
