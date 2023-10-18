import axios from 'axios';

export const signup = (username, password) => axios
  .post('/api/v1/signup', { username, password })
  .then((response) => response.data);

export const login = (username, password) => axios
  .post('/api/v1/login', { username, password })
  .then((response) => response.data);

export const getData = (token) => axios
  .get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => response.data);
