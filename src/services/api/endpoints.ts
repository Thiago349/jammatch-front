import api from "./instance";
import { store } from "src/redux/store";

export const getToken = () => {
  const reduxState = store.getState()
  return reduxState.authentication.token;
};


export const postAuth = async (payload) => {  
  const { data } = await api.post(`v1/auth/`, payload);

  return data;
};


export const getUserSelf = async () => {
  const token = getToken()

  const { data } = await api.get(`v1/users/self`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};


export const putProfile = async (payload: { formData: FormData, profileId: string}) => {  
  const token = getToken()

  const { data } = await api.put(`v1/profiles/${payload.profileId}/photo`, 
    payload.formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};