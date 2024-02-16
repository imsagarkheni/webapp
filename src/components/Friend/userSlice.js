import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../redux/services/userService";

const initialState = {};

export const getUserList = createAsyncThunk(
    "profile/getProfile",
    async (payload) => {
      return await getUsers(payload);
    }
  );

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, action) => {});
  },
});

export default userSlice.reducer;
