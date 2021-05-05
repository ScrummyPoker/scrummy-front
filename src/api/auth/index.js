import axios from 'axios';
import { postWithToken } from '../config';

export const postRegister = async formData =>
  await postWithToken({
    method: 'POST',
    url: process.env.REACT_APP_API_URL + 'auth/register',
    data: formData,
  });

export const postLogIn = async formData =>
  await postWithToken({
    method: 'POST',
    url: process.env.REACT_APP_API_URL + 'auth/login',
    data: formData,
  });

export default {
  postLogIn,
  postRegister,
};
