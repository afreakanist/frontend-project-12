import axios from 'axios';
import routes from './routes';

export const signup = ({ username, password }) => axios
  .post(routes.signup, { username, password })
  .then((response) => response.data);

export const login = ({ username, password }) => axios
  .post(routes.login, { username, password })
  .then((response) => response.data);

export const getData = (headers) => axios
  .get(routes.data, { headers })
  .then((response) => response.data);
