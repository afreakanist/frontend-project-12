import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CurrentUserCtx from './contexts/CurrentUserCtx';
import { useProvideAuth } from './hooks/useAuth';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';

const App = () => {
  const auth = useProvideAuth();

  useEffect(() => {
    auth.checkToken();
  }, []);

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
