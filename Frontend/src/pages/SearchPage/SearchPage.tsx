import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { TextField, Switch } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductsTable from '../../components/ProductsTable';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchAllProducts } from '../../Redux/products/thunk';
import { actions as productsListActions } from '../../Redux/products/slice';
import { getProductsList, getProductLoading } from '../../Redux/products/selectors';
import { LoadingResultsT } from '../../types/loading';
import s from './SearchPage.module.scss';

enum CriteriasT {
  NAME = 'name',
  CATEGORY = 'category',
}

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<CriteriasT>(CriteriasT.NAME);
  const depounceValue = useDebounce(searchValue, 1000);

  const productsList = useAppSelector((state) => getProductsList(state));
  const productsListLoading = useAppSelector((state) => getProductLoading(state));

  useEffect(() => {
    if (depounceValue) {
      const searchQueries: { [key: string]: string } = {};
      searchCriteria === CriteriasT.NAME && (searchQueries.name = depounceValue);
      searchCriteria === CriteriasT.CATEGORY && (searchQueries.category = depounceValue);
      dispatch(fetchAllProducts(searchQueries));
    }
  }, [depounceValue, dispatch]);

  useEffect(() => {
    dispatch(productsListActions.resetProductsList());
  }, []);

  return (
    <div>
      <div>
        <h2>Search by:</h2>
        <div className={s.checkboxContainer}>
          <p>Category</p>
          <Switch
            checked={searchCriteria === CriteriasT.NAME ? true : false}
            onChange={(event) => {
              setSearchValue('');
              dispatch(productsListActions.resetProductsList());
              if (event.target.checked) {
                setSearchCriteria(CriteriasT.NAME);
              } else {
                setSearchCriteria(CriteriasT.CATEGORY);
              }
            }}
          />
          <p>Name</p>
        </div>
      </div>
      <TextField
        id="email"
        type="text"
        label={`Enter full ${searchCriteria}`}
        sx={{ marginBottom: '20px', marginTop: '20px', width: '500px' }}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div>
        {productsListLoading === LoadingResultsT.PENDING && <LoadingSpinner center mt />}
        {!!productsList?.docs.length && productsListLoading === LoadingResultsT.SUCCEEDED && (
          <ProductsTable productsList={productsList.docs} />
        )}
        {productsList?.docs.length === 0 && productsListLoading === LoadingResultsT.SUCCEEDED && <p>No matches</p>}
      </div>
    </div>
  );
};

export default SearchPage;
