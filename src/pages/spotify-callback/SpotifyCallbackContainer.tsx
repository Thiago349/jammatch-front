import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { spotifyAuthorize } from 'src/redux/store'

import { postSpotifyAuth } from "src/services/api/endpoints";

import { useDispatch } from 'react-redux'

const SpotifyCallbackContainer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const code = query.get('code')

    if (code) {
      postSpotifyAuth(code)
        .then(data => {
          dispatch(spotifyAuthorize({ token: data.access_token, refreshToken: data.refresh_token }))
        })
    } 

    navigate('/profile', { replace: true })
  }, [location, history])

  return (
    <>
    </>
  )
}

export default SpotifyCallbackContainer