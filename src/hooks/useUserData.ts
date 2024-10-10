import { useAppSelector, store } from "src/redux/store";
import { useQuery } from "@tanstack/react-query";
import { getSpotifySelf, getUserSelf } from "src/services/api/endpoints";

export const useUserData = () => {
  const reduxState = store.getState();
  const spotifyAuth = useAppSelector(state => state.spotifyAuthentication);

  const { data: userSelf, isLoading: isLoadingUserSelf } = useQuery({
    queryKey: ['getUserSelf'],
    queryFn: getUserSelf,
  });

  const { data: spotifySelf, isLoading: isLoadingSpotifySelf } = useQuery({
    queryKey: ['getSpotifySelf'],
    queryFn: () => getSpotifySelf(),
    enabled: !!spotifyAuth?.token,
  });

  return { userSelf, isLoadingUserSelf, spotifySelf, isLoadingSpotifySelf };
};
