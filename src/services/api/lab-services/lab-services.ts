import { store } from "src/redux/store";

import api from "../instance";
import { getSpotifyAuth } from "../spotify-services/spotify-services";

const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


export const postLabServiceRandom = async () => {
  const spotifyToken = await getSpotifyAuth()

  const token = getAuth().token
  const { data } = await api.post(`v1/lab-services/random`, { spotifyToken }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
