const jwtDecode = require('jwt-decode');

export const parseJwtAndGetUserRole = (token) => {
  const decoded = jwtDecode(token);
  return decoded.auth;
};
