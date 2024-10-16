import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const getRoles = async (profileType: string) => {  
  const token = getAuth().token

  const { data } = await api.get(`v1/roles?profileType=${profileType}`, 
    {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
