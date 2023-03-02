import { RootState } from '../store';
import { ListOfProductsI, ProductI } from '../../types/products';
import { LoadingResultsT } from '../../types/loading';

export const getProductsList = (state: RootState): ListOfProductsI | null => state.products?.productsList;
export const getSelectedProduct = (state: RootState): ProductI | null => state.products?.selectedProduct;
export const getProductLoading = (state: RootState): LoadingResultsT => state.products?.loading;
