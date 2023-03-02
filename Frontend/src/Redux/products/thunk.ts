import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../middleware/api';
import { tokenStorage } from '../../Helpers/tokenStorage';
import { ListOfProductsI, ProductI } from '../../types/products';

interface QueriesI {
  name?: string;
  category?: string;
}

export const fetchAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (queries: QueriesI, { rejectWithValue }) => {
    const qsParams: { [key: string]: string } = {};
    queries?.name && (qsParams.name = queries?.name);
    queries?.category && (qsParams.category = queries?.category);

    try {
      const token = tokenStorage.getAccessToken();
      const { data } = await ApiService.apiCall<ListOfProductsI>({
        endpoint: `/products/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        qsParams,
      });

      return data;
    } catch (error) {
      const errorResponse = (error as { response: { status: number; data: { error: string } } }).response;
      return rejectWithValue({ status: errorResponse.status, message: errorResponse.data.error });
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = tokenStorage.getAccessToken();
      const { data } = await ApiService.apiCall<ProductI>({
        endpoint: `/products/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      const errorResponse = (error as { response: { status: number; data: { error: string } } }).response;
      return rejectWithValue({ status: errorResponse.status, message: errorResponse.data.error });
    }
  },
);
