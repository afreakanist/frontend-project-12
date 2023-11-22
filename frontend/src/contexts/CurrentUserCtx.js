import { createContext, useMemo, useState } from 'react';

export const CurrentUserCtx = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const buildAuthHeaders = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return null;
  };

  const authData = useMemo(() => ({
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
    buildAuthHeaders,
  }), [
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
    buildAuthHeaders]);

  return (
    <CurrentUserCtx.Provider value={authData}>
      {children}
    </CurrentUserCtx.Provider>
  );
};
