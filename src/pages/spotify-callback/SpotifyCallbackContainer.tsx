import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from "@tanstack/react-query";
import { spotifyAuthorize } from 'src/redux/store'

import { Flex, Spin } from "antd"

import { getSpotifySelf, postSpotifyAuth, getUserSelf } from "src/services/api/endpoints";

import { useDispatch } from 'react-redux'

const SpotifyCallbackContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { mutate, data: spotifyAuth, isPending: isSpotifyAuthPending } = useMutation({
    mutationFn: postSpotifyAuth
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
      mutate(code)
    }

    const handleSpotifyCallback = async (code: string) => {
      dispatch(spotifyAuthorize({ token: spotifyAuth.access_token, refreshToken: spotifyAuth.refresh_token }))
    }

    if (userSelf && spotifyAuth && spotifySelf) {
      handleSpotifyCallback(code).then(() => {
        navigate('/home', { replace: true })
      })
    } 
  }, [userSelf, spotifyAuth, spotifySelf])

  return (
    <Flex justify='center' align='center' style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Flex>
  )
}

export default SpotifyCallbackContainer