import api from "./instance";
import { useAppSelector } from "src/redux/store";

export const getToken = () => {
  const token = useAppSelector(state => state.authentication.token)
  return token;
};

export const postAuth = async (credentials) => {  
  const { data } = await api.post("v1/auth", credentials);

  return data;
};
