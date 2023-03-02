import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authorizationSlice from './auth/slice';
import productsSlice from './products/slice';
import cartSlice from './cart/slice';

const rootReducer = combineReducers({
  authorization: authorizationSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
