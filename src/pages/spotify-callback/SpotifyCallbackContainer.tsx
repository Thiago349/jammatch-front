import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { spotifyAuthorize } from 'src/redux/store'

import { postAuth } from "src/services/spotify/endpoints"
import { useDispatch } from 'react-redux'

const SpotifyCallbackContainer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const code = query.get('code')

    if (code) {
      postAuth(code)
        .then(data => {
          dispatch(spotifyAuthorize({ token: data.access_token, refreshToken: data.refresh_token }))
        })
    } 
    
    navigate('/profile', { replace: true })
  }, [])

  return (
    <>
    </>
  )
}

export default SpotifyCallbackContainer