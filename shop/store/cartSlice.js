import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (p) => p.product.id === action.payload.product.id
      );
      if (item) {
        item.quantity++;
        item.current_price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCart: (state, action) => {
      state.cartItems.map((p) => {
        if (p.product.id === action.payload.product.id) {
          if (action.payload.key === "quantity") {
            p.product.current_price = p.oneQuantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
