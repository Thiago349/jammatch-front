import { store, authorize } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const postAuth = async (payload) => {  
  const { data } = await api.post(`v1/auth`, payload);

  return data;
};


export const refreshAuth = async () => {
  const authData = getAuth()
  const { data } = await api.post(`v1/auth/refresh`, {
    "refreshToken": authData.refreshToken,
    "username": authData.username
  });

  store.dispatch(authorize({...data, refreshToken: authData.refreshToken, username: authData.username}))

  return data;
};