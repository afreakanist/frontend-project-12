import axios from 'axios';
import routes from './routes';

export const signup = ({ username, password }) => axios
  .post(routes.signup, { username, password })
  .then((response) => response.data);

export const login = ({ username, password }) => axios
  .post(routes.login, { username, password })
  .then((response) => response.data);

export const getData = (token) => axios
  .get(routes.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => response.data);
