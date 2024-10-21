import querystring from 'querystring'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

const generateRandomString = (length: number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


const handleSpotifyLogin = () => {
    const state = generateRandomString(16)
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public'

    const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        })

    window.location.href = spotifyAuthUrl
}

export default handleSpotifyLogin 