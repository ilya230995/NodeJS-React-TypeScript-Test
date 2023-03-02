import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useSelector';
import { getIsUserAuthorized } from '../../Redux/auth/selectors';
import Navigation from '../../components/Navigation';
import { routes } from '../routes';

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  const isUserAuthorizated = useAppSelector((state) => getIsUserAuthorized(state));
  const { login } = routes;

  if (!isUserAuthorizated) {
    return <Navigate to={login} state={{ from: location }} replace />;
  }
  return <Navigation />;
};

export default PrivateRoute;
