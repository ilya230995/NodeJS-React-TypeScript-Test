import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import ProductsTable from '../../components/ProductsTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchAllProducts } from '../../Redux/products/thunk';
import { getProductsList, getProductLoading } from '../../Redux/products/selectors';
import { LoadingResultsT } from '../../types/loading';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => getProductsList(state));
  const productsListLoading = useAppSelector((state) => getProductLoading(state));

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  return (
    <>
      <div>
        {productsList && productsListLoading === LoadingResultsT.SUCCEEDED ? (
          <ProductsTable productsList={productsList.docs} />
        ) : (
          <LoadingSpinner center mt />
        )}
      </div>
    </>
  );
};

export default HomePage;
