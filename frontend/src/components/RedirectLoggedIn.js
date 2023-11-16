import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const RedirectLoggedIn = ({ children }) => {
  const { user } = useAuth();

  return user?.isLoggedIn ? <Navigate to={routes.mainPage} replace /> : children;
};

export default RedirectLoggedIn;
