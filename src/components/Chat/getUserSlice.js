import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../redux/services/userService";

const initialState = {};

export const getUser = createAsyncThunk(
    "profile/getProfile",
    async (payload) => {
      return await getUserById(payload);
    }
  );

const getUserByIdSlice = createSlice({
  name: "getUserByIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {});
  },
});

export default getUserByIdSlice.reducer;
