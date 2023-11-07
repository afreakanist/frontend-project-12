import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes from '../utils/routes';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.isLoggedIn ? children : <Navigate to={routes.loginPage} replace />;
};

export default ProtectedRoute;
