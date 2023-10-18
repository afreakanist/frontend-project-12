import { useState, useEffect } from 'react';
import {
  Navigate, Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from './utils/api';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import CurrentUserCtx from './contexts/CurrentUserCtx';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [requestError, setRequestError] = useState('');
  const dispatch = useDispatch();
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
        .then(({ channels, messages }) => {
          dispatch(channelsActions.setChannels(channels));
          dispatch(messagesActions.setMessages(messages));
          setRequestError('');
        })
        .catch((err) => handleError(err));
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const username = localStorage.getItem('username');
      setCurrentUser({ username, isLoggedIn: true });
      navigate(location.pathname);
    }
  };

  useEffect(() => {
    checkToken();
  }, []); // runs once

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      getChatData();
    }
  }, [currentUser.isLoggedIn]); // runs when currentUser.isLoggedIn changes

  const handleLogin = ({ username, password }) => api.login(username, password)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('username', username);
      setCurrentUser({ username, isLoggedIn: true });
      navigate('/');
      setRequestError('');
    })
    .catch((err) => handleError(err));

  const handleSignup = ({ username, password }) => api.signup(username, password)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('username', username);
      setCurrentUser({ username, isLoggedIn: true });
      navigate('/');
      setRequestError('');
    })
    .catch((err) => handleError(err));

  return (
    <CurrentUserCtx.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route
          path="login"
          element={
            currentUser.isLoggedIn
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} error={requestError} setError={setRequestError} />
          }
        />
        <Route path="signup" element={<Signup onSignup={handleSignup} error={requestError} setError={setRequestError} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserCtx.Provider>
  );
};

export default App;
