import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  cart: localStorage.getItem("redCart")
    ? JSON.parse(localStorage.getItem("redCart"))
    : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("redCart", JSON.stringify(state.cart));
    },
    removeToCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== productId);
      localStorage.setItem("redCart", JSON.stringify(state.cart));
    },
  },
});
export const { addToCart, removeToCart } = cartSlice.actions;
export default cartSlice.reducer;
