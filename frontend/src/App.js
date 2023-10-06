import { useState, useEffect } from 'react';
import {
  Routes, Route, Navigate, useNavigate, useLocation,
} from 'react-router-dom';
import CurrentUserContext from './contexts/CurrentUser';
import * as api from './utils/api';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleError = (error) => {
    if (error.isAxiosError) {
      const { message, statusCode } = error.response.data;
      console.error(`Error: ${statusCode} (${message})`);
      setRequestError(`Error: ${statusCode} (${message})`);
    } else {
      console.error(error);
    }
  };

  const getChatData = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getData(token)
        .then((data) => {
          console.log('App | getChatData() received chat data:', data);
          navigate(location.pathname);
          setRequestError('');
        })
        .catch((err) => handleError(err));
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log('App | checkToken() token exists');
      setIsLoggedIn(true);
    } else {
      console.log('App | checkToken() no token');
      if (location.pathname === '/') {
        navigate('/login');
      } else {
        navigate(location.pathname);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []); // runs once

  useEffect(() => {
    if (isLoggedIn) {
      getChatData();
    }
  }, [isLoggedIn]); // runs when isLoggedIn changes

  const handleLogin = ({ username, password }) => {
    api.login(username, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        setCurrentUser({ username });
        navigate('/');
        setRequestError('');
      })
      .catch((err) => handleError(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="login"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} error={requestError} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
