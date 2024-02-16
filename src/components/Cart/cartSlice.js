import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart,addtoCart } from "../../redux/services/cartService";

const initialState = {};

export const getCartDetails = createAsyncThunk(
  "cart/list",
  async (payload) => {
    return await getCart(payload);
  }
);
export const addCartDetails = createAsyncThunk(
  "cart/addtocart",
  async (payload) => {
    return await addtoCart(payload);
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {});
  },
});

export default cartSlice.reducer;
