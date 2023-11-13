import {
  createContext, useCallback, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

export const CurrentUserCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const checkToken = useCallback(() => {
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
  }, []);

  const onAuthSuccess = useCallback(({ token, username }) => {
    setUser({ username, isLoggedIn: true });
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', username);
  }, []);

  const handleSignup = useCallback((userData) => api.signup(userData).then(onAuthSuccess), []);

  const handleLogin = useCallback((userData) => api.login(userData).then(onAuthSuccess), []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.clear();
  }, []);

  const buildAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return null;
  }, []);

  const authData = useMemo(() => ({
    user,
    checkToken,
    handleSignup,
    handleLogin,
    handleLogout,
    buildAuthHeaders,
  }), [
    user,
    checkToken,
    handleSignup,
    handleLogin,
    handleLogout,
    buildAuthHeaders]);

  return (
    <CurrentUserCtx.Provider value={authData}>
      {children}
    </CurrentUserCtx.Provider>
  );
};
