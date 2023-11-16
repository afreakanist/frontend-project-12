import {
  createContext, useCallback, useMemo, useState,
} from 'react';

export const CurrentUserCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const username = localStorage.getItem('username');
      setUser({ username, isLoggedIn: true });
    }
  }, []);

  const handleLogin = useCallback(({ token, username }) => {
    setUser({ username, isLoggedIn: true });
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', username);
  }, []);

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
    handleLogin,
    handleLogout,
    buildAuthHeaders,
  }), [
    user,
    checkToken,
    handleLogin,
    handleLogout,
    buildAuthHeaders]);

  return (
    <CurrentUserCtx.Provider value={authData}>
      {children}
    </CurrentUserCtx.Provider>
  );
};
