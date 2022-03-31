const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID

let accessToken = '';
const Spotify = {
  getAccessToken() {
    if(accessToken !== '') {
      return accessToken
    }

  }
}

export default Spotify;