const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const accessTokenRE = /access_token=([^&]*)/;
const expiresInRE = /expires_in=([^&]*)/;
let accessToken;


const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken
    }
    
    const accessTokenREMatch = window.location.href.match(accessTokenRE);
    const expiresInREMatch = window.location.href.match(expiresInRE);
    if(accessTokenREMatch && expiresInREMatch) {
      accessToken = accessTokenREMatch[1];
      const expiresIn = Number(expiresInREMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  async search(term) {
    const access_token = Spotify.getAccessToken();
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if(response.ok) {
      let responseJSON = await response.json();
      console.log(responseJSON);
      if(responseJSON.tracks) {
        return responseJSON.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }
        })
      }
    } else {
      return [];
    }
  }
}

export default Spotify;