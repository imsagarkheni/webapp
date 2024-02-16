import {
    GETUSERS,GETUSERBYID
  } from "../../api/constApi";
  import authHeader from "./authHeader";
  import { apiInstance } from "./axiosApi";
  
  export const getUsers = (payload) => {
    return apiInstance.post(GETUSERS,payload, { headers: authHeader() });
  };

  export const getUserById = (payload) => {
    return apiInstance.post(GETUSERBYID,payload, { headers: authHeader() });
  };