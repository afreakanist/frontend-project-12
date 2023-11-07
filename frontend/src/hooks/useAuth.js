import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrentUserCtx from '../contexts/CurrentUserCtx';
import * as api from '../utils/api';

export const useAuth = () => useContext(CurrentUserCtx);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const username = localStorage.getItem('username');
      setUser({ username, isLoggedIn: true });
      if (location.pathname === '/login') {
        navigate('/');
      } else {
        navigate(location.pathname);
      }
    }
  };

  const onAuthSuccess = ({ token, username }) => {
    setIsPending(false);
    setRequestError(null);
    setUser({ username, isLoggedIn: true });
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', username);
    navigate('/');
  };

  const handleSignup = (userData) => {
    setIsPending(true);
    return api.signup(userData).then(onAuthSuccess);
  };

  const handleLogin = (userData) => {
    setIsPending(true);
    return api.login(userData).then(onAuthSuccess);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  const buildAuthHeaders = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return null;
  };

  const buildI18nKey = (statusCode, callee) => (callee
    ? `requestError.${statusCode}.${callee}`
    : `requestError.${statusCode}`);

  const handleError = (error, callee = '') => {
    const { message, statusCode } = error.response.data;
    setRequestError({ key: buildI18nKey(statusCode, callee), values: { message, statusCode } });
  };

  const authData = {
    user,
    isPending,
    requestError,
    setRequestError,
    checkToken,
    handleSignup,
    handleLogin,
    handleLogout,
    buildAuthHeaders,
    handleError,
  };

  return authData;
};
