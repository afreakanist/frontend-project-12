import { useState, useEffect } from 'react';
import {
  Routes, Route, Navigate, useNavigate, useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as api from './utils/api';
import { logIn, setCurrentUser } from './slices/userSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [requestError, setRequestError] = useState('');
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
          data.channels.forEach((channel) => dispatch(channelsActions.addChannel(channel)));
          data.messages.forEach((channel) => dispatch(messagesActions.addMessage(channel)));
          setRequestError('');
        })
        .catch((err) => handleError(err));
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const username = localStorage.getItem('username');
      dispatch(logIn());
      dispatch(setCurrentUser({ username }));
    } else if (location.pathname === '/') {
      navigate('/login');
    } else {
      navigate(location.pathname);
    }
  };

  useEffect(() => {
    checkToken();
  }, []); // runs once

  useEffect(() => {
    if (user.isLoggedIn) {
      getChatData();
    }
  }, [user.isLoggedIn]); // runs when user.isLoggedIn changes

  const handleLogin = ({ username, password }) => {
    api.login(username, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('username', username);
        dispatch(logIn());
        dispatch(setCurrentUser({ username }));
        navigate('/');
        setRequestError('');
      })
      .catch((err) => handleError(err));
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="login"
        element={
          user.isLoggedIn
            ? <Navigate to="/" replace />
            : <Login onLogin={handleLogin} error={requestError} />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
