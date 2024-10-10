import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const postSpotifyAttachment = async (payload: { userId: string, spotifyId: string}) => {
  const token = getAuth().token
  const { data } = await api.post(`v1/spotify-attachments`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
