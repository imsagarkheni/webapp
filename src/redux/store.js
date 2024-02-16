import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/auth/authSlice";
import productSlice from "../components/Products/productSlice";
import profileSlice from "../components/Profile/profileSlice";
import cartSlice from "../components/Cart/cartSlice";
import userSlice from "../components/Chat/getUserSlice";

const combineReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  getproduct: productSlice,
  cart: cartSlice,
  users: userSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
