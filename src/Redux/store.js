import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsReducer";
import profileReducer from "./profileReducer";

export default configureStore({
  reducer: {
    products: productsReducer,
    profile: profileReducer,
  },
});
