import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from './thunk';
import { ErrorResponseI } from '../../types/auth';
import { ListOfProductsI, ProductI } from '../../types/products';
import { LoadingResultsT } from '../../types/loading';

interface IState {
  productsList: ListOfProductsI | null;
  selectedProduct: ProductI | null;
  loading: LoadingResultsT;
  error?: number | null;
  errorMessage?: string;
}

const initialState: IState = {
  productsList: null,
  selectedProduct: null,
  loading: LoadingResultsT.IDLE,
  error: null,
  errorMessage: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductsList: (state) => {
      state.productsList = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.productsList = payload as ListOfProductsI;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        const payloadType = payload as ErrorResponseI;
        state.error = payloadType.status;
        state.errorMessage = payloadType.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.selectedProduct = payload as ProductI;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        const payloadType = payload as ErrorResponseI;
        state.error = payloadType.status;
        state.errorMessage = payloadType.message;
      }),
});

export const { actions } = productsSlice;
export default productsSlice;
