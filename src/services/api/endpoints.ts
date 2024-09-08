import api from "./instance";
import { store } from "src/redux/store";

export const getToken = () => {
  const reduxState = store.getState()
  return reduxState.authentication.token;
};

export const postAuth = async (credentials) => {  
  const { data } = await api.post("v1/auth/", credentials);

  return data;
};

export const getUserSelf = async () => {
  const token = getToken()

  const { data } = await api.get("v1/users/self", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};