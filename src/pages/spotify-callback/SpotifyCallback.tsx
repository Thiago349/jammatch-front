import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { spotifyAuthorize } from 'src/redux/store'

import { Flex, Spin } from "antd"

import { getSpotifySelf, postSpotifyAuth, postSpotifyAttachment, getUserSelf } from "src/services/api/endpoints";

import { useDispatch } from 'react-redux'

const SpotifyCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { mutate: mutateSpotifyAuth, data: spotifyAuth, isPending: isSpotifyAuthPending } = useMutation({
    mutationFn: postSpotifyAuth,
  })

  const onSpotifyAttachmentSuccess = () => {
    dispatch(spotifyAuthorize({ token: spotifyAuth.access_token, refreshToken: spotifyAuth.refresh_token }))
    navigate('/home', { replace: true })
		queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
	};

  const { mutate: mutateSpotifyAttachment, data: spotifyAttachment, isPending: isSpotifyAttachmentPending } = useMutation({
    mutationFn: postSpotifyAttachment,
    onSuccess: onSpotifyAttachmentSuccess
  })

  const query = new URLSearchParams(location.search)
  const code = query.get('code')  

  const { data: userSelf } = useQuery({
		queryKey: ['getUserSelf'],
		queryFn: getUserSelf
  })

  const { data: spotifySelf } = useQuery({
		queryKey: ['getSpotifySelf'],
    staleTime: 0,
		queryFn: () => {
      return getSpotifySelf(spotifyAuth.access_token)
    },
    enabled: !!spotifyAuth?.access_token
  })

  useEffect(() => {
    if (!spotifyAuth && !isSpotifyAuthPending) {
      mutateSpotifyAuth(code)
    }

    if (userSelf && spotifyAuth && spotifySelf) {
      if (!userSelf.spotify) {
        mutateSpotifyAttachment({ userId: userSelf.id, spotifyId: spotifySelf.id })
      }
      else if (userSelf.spotify.spotifyId == spotifySelf.id) {
        dispatch(spotifyAuthorize({ token: spotifyAuth.access_token, refreshToken: spotifyAuth.refresh_token }))
        navigate('/home', { replace: true })
      }
    }
  }, [userSelf, spotifyAuth, spotifySelf])

  return (
    <Flex justify='center' align='center' style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Flex>
  )
}

export default SpotifyCallback