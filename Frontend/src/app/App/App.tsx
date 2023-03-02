import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useDispatch';
import { routes } from '../routes';
import LoadingSpinner from '../../components/LoadingSpinner';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { getCurrentUser } from '../../Redux/auth/thunk';
import { tokenStorage } from '../../Helpers/tokenStorage';
import { actions as cartActions } from '../../Redux/cart/slice';

const AuthPage = lazy(() => import('../../pages/AuthPage') /* webpackChunkName: "AuthPage" */);
const HomePage = lazy(() => import('../../pages/HomePage') /* webpackChunkName: "HomePage" */);
const SearchPage = lazy(() => import('../../pages/SearchPage') /* webpackChunkName: "SearchPage" */);
const ProductPage = lazy(() => import('../../pages/ProductPage') /* webpackChunkName: "SearchPage" */);
const CartPage = lazy(() => import('../../pages/CartPage') /* webpackChunkName: "CartPage" */);

function App() {
  const dispatch = useAppDispatch();
  const { login, home, search, product, cart } = routes;

  useEffect(() => {
    dispatch(getCurrentUser());
    const savedCart = tokenStorage.getCart();
    if (savedCart) {
      dispatch(cartActions.setNewCart(JSON.parse(savedCart)));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner center mt />}>
        <div className="main-container">
          <Routes>
            <Route index element={<PublicRoute />} />
            <Route
              path={login}
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route path={home} element={<HomePage />} />
              <Route path={search} element={<SearchPage />} />
              <Route path={product} element={<ProductPage />}>
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              <Route path={cart} element={<CartPage />} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
