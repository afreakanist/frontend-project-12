import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import CurrentUserCtx from './contexts/CurrentUserCtx';
import { useProvideAuth } from './hooks/useAuth';
import { getData } from './utils/api';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';

const App = () => {
  const auth = useProvideAuth();
  const dispatch = useDispatch();

  const getChatData = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getData(token)
        .then(({ channels, messages }) => {
          dispatch(channelsActions.setChannels(channels));
          dispatch(messagesActions.setMessages(messages));
        })
        .catch((error) => {
          auth.handleError(error, 'getData');
          toast(auth.requestError.key, auth.requestError.values);
        });
    }
  };

  useEffect(() => {
    auth.checkToken();
  }, []);

  useEffect(() => {
    if (auth.user?.isLoggedIn) {
      getChatData();
    }
  }, [auth.user?.isLoggedIn]);

  return (
    <CurrentUserCtx.Provider value={auth}>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" />
    </CurrentUserCtx.Provider>
  );
};

export default App;
