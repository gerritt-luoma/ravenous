// Load client ID and retirect URI from .env.local
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

// Regex expressions for parsing href
const accessTokenRE = /access_token=([^&]*)/;
const expiresInRE = /expires_in=([^&]*)/;

// Global access token
let accessToken;

const Spotify = {
  getAccessToken() {
    // There are 3 cases to account for
    // First, the access token has already been set for the session
    if(accessToken) {
      return accessToken
    }
    
    // Parse accessToken from href
    const accessTokenREMatch = window.location.href.match(accessTokenRE);
    const expiresInREMatch = window.location.href.match(expiresInRE);
    
    // Second, the access token has just been passed to the href of the window
    if(accessTokenREMatch && expiresInREMatch) {
      accessToken = accessTokenREMatch[1];
      const expiresIn = Number(expiresInREMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    
    // Third, there is no href so we must redirect to the authorization link
    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  async search(term) {
    // Always get the access token for each search to verify it is valid
    const access_token = Spotify.getAccessToken();

    // Make API call
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // For now I have no error handling, always expecting a working case
    // Error handling could be a good project in the future
    if(response.ok) {
      const responseJSON = await response.json();

      // If the response has tracks return a list of objects
      // else, return an empty list
      if(responseJSON.tracks) {
        return responseJSON.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    } else {
      return [];
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    // Verify inputs are defined
    if(!playlistName || !trackURIs) {
      return;
    }

    // Get access token and create headers for following fetch calls
    const access_token = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'appication/json',
    }

    // Get user ID for playlist calls
    let userID;
    let response = await fetch('https://api.spotify.com/v1/me',{
      headers: headers,
    });
    if(response.ok) {
      const responseJSON = await response.json();
      userID = responseJSON.id;
    } else {
      console.log('ERROR: Could not get user ID');
      return;
    }

    // Create new playlist with the given name
    let playlistID;
    response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    });
    if(response.ok) {
      const responseJSON = await response.json();
      playlistID = responseJSON.id;
    } else {
      console.log('ERROR: Failed to create new playlist');
      return;
    }

    // Use a post call to add tracks to newly created playlist
    response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
      headers: headers,
      method: "POST",
      body: JSON.stringify({uris: trackURIs})
    });
    if(response.ok) {
      console.log('Successfully added tracks');
    } else {
      console.log('ERROR: Failed to add tracks to playlist');
    }
  },
}

export default Spotify;