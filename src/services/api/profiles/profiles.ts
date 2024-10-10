import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const getProfile = async (profileId: string) => {  
    const token = getAuth().token
  
    const { data } = await api.get(`v1/profiles/${profileId}`, 
      {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
};
  
  
export const putProfile = async (payload: { body: { name: string, description: string }, profileId: string }) => {  
    const token = getAuth().token
  
    const { data } = await api.put(`v1/profiles/${payload.profileId}`, 
      payload.body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
};
  
  
export const putProfilePhoto = async (payload: { formData: FormData, profileId: string}) => {  
    const token = getAuth().token
  
    const { data } = await api.put(`v1/profiles/${payload.profileId}/photo`, 
      payload.formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
};