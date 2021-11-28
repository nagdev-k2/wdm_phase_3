import { LOGIN, LOGOUT, REGISTER } from './types';

export const loginAction = (data) => ({
  type: LOGIN,
  data,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const registerAction = (data) => ({
  type: REGISTER,
  data,
});