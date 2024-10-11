import { store } from "src/redux/store";

import api from "../instance";


const getAuth = () => {
  const reduxState = store.getState()
  return reduxState.authentication;
};


const postSpotifyRefresh = async (refreshToken: string) => {
  const token = getAuth().token

  const { data } = await api.post(`v1/spotify-services/auth/refresh`, { refreshToken: refreshToken }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};


export const getSpotifyAuth = async () => {
  const spotifyRefreshToken = store.getState().spotifyAuthentication.refreshToken
  const spotifyToken = await postSpotifyRefresh(spotifyRefreshToken)
  return spotifyToken?.access_token;
};


export const getSpotifySelf = async (userToken?: string) => {
  const token = getAuth().token
  const spotifyToken = userToken ?? await getSpotifyAuth()

  const { data } = await api.get(`v1/spotify-services/self?userToken=${spotifyToken}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};


export const postSpotifyAuth = async (code: string) => {
  const token = getAuth().token

  const { data } = await api.post(`v1/spotify-services/auth`, { code: code }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
