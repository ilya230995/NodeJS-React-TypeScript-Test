import { createSlice } from '@reduxjs/toolkit';
import { CartI } from '../../types/cart';
import { tokenStorage } from '../../Helpers/tokenStorage';

interface IState {
  cartList: CartI[];
}

const initialState: IState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNewCart: (state, { payload }) => {
      const payloadT = payload as CartI[];
      state.cartList = payloadT;
    },
    setNewItem: (state, { payload }) => {
      const payloadT = payload as CartI;
      const itemIndex = state.cartList.findIndex((item) => item.id === payloadT.id);
      const newCart = [...state.cartList];
      if (itemIndex !== -1) {
        newCart.splice(itemIndex, 1, { ...payloadT, quantity: newCart[itemIndex].quantity + payloadT.quantity });
      } else {
        newCart.push(payloadT);
      }
      state.cartList = newCart;
      tokenStorage.setCart(JSON.stringify(newCart));
    },
    updateQuantity: (state, { payload }) => {
      const payloadT = payload as CartI;
      const itemIndex = state.cartList.findIndex((item) => item.id === payloadT.id);
      const newCart = [...state.cartList];
      if (itemIndex !== -1) {
        newCart.splice(itemIndex, 1, payloadT);
      }
      state.cartList = newCart;
      tokenStorage.setCart(JSON.stringify(newCart));
    },
    removeItem: (state, { payload }) => {
      const id = payload as string;
      const itemIndex = state.cartList.findIndex((item) => item.id === id);
      const copiedCartList = [...state.cartList];
      copiedCartList.splice(itemIndex, 1);
      state.cartList = copiedCartList;
      tokenStorage.setCart(JSON.stringify(copiedCartList));
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice;
