import axios from 'axios';
import { getUserToken } from '../services/auth';

export const postWithToken = async ({ method, url, data }) => {
  return await axios({
    method,
    url,
    data,
    headers: {
      Authorization: 'Bearer ' + getUserToken(),
    },
  })
    .then(res => ({ ...res.data }))
    .catch(error => console.log(error));
};
