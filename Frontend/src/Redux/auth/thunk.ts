import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../middleware/api';
import { AuthResponseI, AuthRequestBodyI, UserResponseI } from '../../types/auth';
import { tokenStorage } from '../../Helpers/tokenStorage';

export const register = createAsyncThunk(
  'auth/register',
  async (requestData: AuthRequestBodyI, { rejectWithValue }) => {
    try {
      const { data } = await ApiService.apiCall<AuthResponseI>({
        endpoint: '/auth/register/',
        method: 'POST',
        query: requestData,
      });

      return data;
    } catch (error) {
      const errorResponse = (error as { response: { status: number; data: { error: string } } }).response;
      return rejectWithValue({ status: errorResponse.status, message: errorResponse.data.error });
    }
  },
);

export const login = createAsyncThunk('auth/login', async (requestData: AuthRequestBodyI, { rejectWithValue }) => {
  try {
    const { data } = await ApiService.apiCall<AuthResponseI>({
      endpoint: '/auth/login/',
      method: 'POST',
      query: requestData,
    });

    return data;
  } catch (error) {
    const errorResponse = (error as { response: { status: number; data: { error: string } } }).response;
    return rejectWithValue({ status: errorResponse.status, message: errorResponse.data.error });
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const token = tokenStorage.getAccessToken();
    const { data } = await ApiService.apiCall<UserResponseI>({
      endpoint: '/users/me/',
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
});
