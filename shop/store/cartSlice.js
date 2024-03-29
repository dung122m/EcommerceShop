import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const size = action.payload.size;
      const item = state.cartItems.find(
        (p) => p.product.id === action.payload.product.id && p.size === size
      );

      if (item) {
        item.quantity++;
        item.product.current_price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.product.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.product.current_price = p.oneQuantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.product.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, removeFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
