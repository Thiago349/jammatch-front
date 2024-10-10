import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const getUserSelf = async () => {
  const token = getAuth().token

  const { data } = await api.get(`v1/users/self`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};