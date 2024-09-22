import { store } from "src/redux/store";

import api from "./instance";
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
const SPOTIFY_CLIENT = import.meta.env.VITE_SPOTIFY_CLIENT
const SPOTIFY_SECRET = import.meta.env.VITE_SPOTIFY_SECRET


export const postAuth = async (code: string) => {
  const params = {
    code: code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
    client_id: SPOTIFY_CLIENT,
    client_secret: SPOTIFY_SECRET
  }
  const { data } = await api.post(`token`, new URLSearchParams(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  return data;
};
