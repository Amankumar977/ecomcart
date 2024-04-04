import { configureStore } from "@reduxjs/toolkit";
import cart from "./reducers/cart";
const store = configureStore({
  reducer: {
    cart: cart,
  },
});
export default store;
