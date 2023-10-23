import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
