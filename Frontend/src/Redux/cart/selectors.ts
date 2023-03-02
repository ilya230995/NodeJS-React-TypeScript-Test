import { RootState } from '../store';
import { CartI } from '../../types/cart';

export const getCartList = (state: RootState): CartI[] => state.cart?.cartList;
