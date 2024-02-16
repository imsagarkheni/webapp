import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  addProfile,
  addProfilePic,
  profile,
} from "../../redux/services/profileService";

const getProfileDetail = () => {
  let profileDetails = localStorage.getItem("Profile");
  if (profileDetails && profileDetails !== "undefined") {
    return JSON.parse(profileDetails);
  } else {
    return null;
  }
};

const initialState = {
  profileDetails: localStorage.getItem("Profile") ? getProfileDetail() : {},
};

export const getProfileDetails = createAsyncThunk(
  "profile/getProfile",
  async () => {
    return await profile();
  }
);

export const addProfileDetails = createAsyncThunk(
  "profile/addProfile",
  async (payload) => {
    return await addProfile(payload);
  }
);

export const addProfileImage = createAsyncThunk(
  "profile/addProfilePic",
  async (payload) => {
    return await addProfilePic(payload);
  }
);

const updateLocalStorage = (profileDetails) => {
  localStorage.setItem("Profile", profileDetails ? JSON.stringify(profileDetails) : undefined);
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileDetails.fulfilled, (state, action) => {
      state.profileDetails = action?.payload?.data?.Data;
      updateLocalStorage(state.profileDetails);
    });
    builder.addCase(addProfileImage.fulfilled, (state, action) => {
      state.profileDetails = action?.payload?.data?.Data;
      updateLocalStorage(state.profileDetails);
    });
  },
});

export default profileSlice.reducer;

export const selectDetails = (state) => state.profile.profileDetails;

export const useProfileDetails = () => {
  const profileDetails = useSelector(selectDetails);
  return useMemo(() => profileDetails, [profileDetails]);
};
