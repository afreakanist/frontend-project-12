import { createContext, useMemo, useState } from 'react';

export const CurrentUserCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const username = localStorage.getItem('username');
      setUser({ username, isLoggedIn: true });
    }
  };

  const handleLogin = ({ token, username }) => {
    setUser({ username, isLoggedIn: true });
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', username);
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
