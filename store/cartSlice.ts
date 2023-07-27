import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { CartProduct } from '../utils/api/types/cms';
import { AppState } from './store';

const getCartProductKey = (product: CartProduct) => `${product.id}-${product.color}`;

export type CartState = {
  products: Record<string, CartProduct>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shipping: {
    method: string;
    price: number;
  };
};

export const initialState: CartState = {
  products: {},
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  shipping: {
    method: 'DPD',
    price: 20,
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.address = action.payload.address;
      state.products = action.payload.products;
      state.address = action.payload.address;
      state.shipping = action.payload.shipping;
    },

    deleteProduct: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const key = getCartProductKey(product);
      if (state.products[key]) {
        delete state.products[key];
      }
    },

    setProduct: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const key = getCartProductKey(product);
      if (product.quantity > 0) {
        state.products[key] = product;
      } else {
        delete state.products[key];
      }
    },

    clearProducts: (state) => {
      state.products = {};
    },

    setCustomer: (state, action: PayloadAction<CartState['customer']>) => {
      state.customer = action.payload;
    },

    setAddress: (state, action: PayloadAction<CartState['address']>) => {
      state.address = action.payload;
    },

    setShipping: (state, action: PayloadAction<CartState['shipping']>) => {
      state.shipping = action.payload;
    },

    extraReducers: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [HYDRATE]: (state, action) => {
        const nextState = {
          ...state,
          ...action.payload.cart,
        };
        if (Object.keys(action.payload.cart.products).length > 0) {
          nextState.products = action.payload.products;
        }
      },
    },
  },
});

export const { setCart, setProduct, deleteProduct, clearProducts, setAddress, setCustomer, setShipping } =
  cartSlice.actions;

export const selectCart = (state: AppState) => state.cart;
export const selectProducts = (state: AppState) => state.cart.products;
export const selectAddress = (state: AppState) => state.cart.address;
export const selectCustomer = (state: AppState) => state.cart.customer;
export const selectShipping = (state: AppState) => state.cart.shipping;

export default cartSlice.reducer;
