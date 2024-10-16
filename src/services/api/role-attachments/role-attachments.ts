import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const postRoleAttachments = async (payload: { profileId: string, roleId: string }) => {  
    const token = getAuth().token
  
    const { data } = await api.post(`v1/role-attachments`, 
      payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
};
  
  
export const deleteRoleAttachments = async (roleAttachmentId: string) => {  
    const token = getAuth().token
  
    const { data } = await api.delete(`v1/role-attachments/${roleAttachmentId}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
};
  
