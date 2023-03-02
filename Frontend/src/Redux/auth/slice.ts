import { createSlice } from '@reduxjs/toolkit';
import { tokenStorage } from '../../Helpers/tokenStorage';
import { register, login, getCurrentUser } from './thunk';
import { ErrorResponseI, UserResponseI } from '../../types/auth';
import { LoadingResultsT } from '../../types/loading';

interface IState {
  isUserAuthorizated: boolean;
  user: UserResponseI | null;
  loading: LoadingResultsT;
  error?: number | null;
  errorMessage?: string;
}

const initialState: IState = {
  isUserAuthorizated: false,
  user: null,
  loading: LoadingResultsT.IDLE,
  error: null,
  errorMessage: '',
};

const authorizationSlice = createSlice({
  name: 'userAuthorization',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.isUserAuthorizated = true;
        tokenStorage.setAccessToken(payload.accessToken);
        state.user = payload.user;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        state.isUserAuthorizated = false;
        const payloadType = payload as ErrorResponseI;
        state.error = payloadType.status;
        state.errorMessage = payloadType.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.isUserAuthorizated = true;
        tokenStorage.setAccessToken(payload.accessToken);
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        state.isUserAuthorizated = false;
        const payloadType = payload as ErrorResponseI;
        state.error = payloadType.status;
        state.errorMessage = payloadType.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.isUserAuthorizated = true;
        state.user = payload as UserResponseI;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        const payloadType = payload as ErrorResponseI;
        if (payloadType.status === 401) {
          tokenStorage.removeAccessToken();
          state.isUserAuthorizated = false;
        }
      }),
});

export const { actions } = authorizationSlice;
export default authorizationSlice;
