import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useSelector';
import { getIsUserAuthorized } from '../../Redux/auth/selectors';
import { routes } from '../routes';

interface PublicRouteI {
  children?: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteI> = ({ children }) => {
  const location = useLocation();
  const isUserAuthorizated = useAppSelector((state) => getIsUserAuthorized(state));
  const from = location.state?.from?.pathname || routes.home;

  if (!!isUserAuthorizated) {
    return <Navigate to={from} replace />;
  }

  return children ? children : <Navigate to={routes.login} state={{ from: location }} replace />;
};

export default PublicRoute;
