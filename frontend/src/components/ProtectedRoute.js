import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import CurrentUserCtx from '../contexts/CurrentUserCtx';

const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(CurrentUserCtx);

  return currentUser.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
