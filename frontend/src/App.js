import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuth from './hooks/useAuth';
import routes from './utils/routes';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectLoggedIn from './components/RedirectLoggedIn';
import Signup from './components/Signup';

const App = () => {
  const { checkToken } = useAuth();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.mainPage} element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path={routes.loginPage} element={<RedirectLoggedIn><Login /></RedirectLoggedIn>} />
        <Route path={routes.signupPage} element={<RedirectLoggedIn><Signup /></RedirectLoggedIn>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
