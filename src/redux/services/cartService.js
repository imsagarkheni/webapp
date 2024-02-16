import { GETCART,ADDTOCART } from "../../api/constApi";
import { apiInstance } from "./axiosApi";
import authHeader from "./authHeader";


export const getCart = (payload) => {
  return apiInstance.post(GETCART,payload, { headers: authHeader() });
};
export const addtoCart = (payload) => {
  return apiInstance.post(ADDTOCART, payload, { headers: authHeader() });
};
