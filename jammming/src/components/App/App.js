import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist',
          album: 'album',
          id: 1,
        },
        {
          name: 'name2',
          artist: 'artist',
          album: 'album',
          id: 2,
        },
        {
          name: 'name3',
          artist: 'artist',
          album: 'album',
          id: 3,
        }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track],
    });
  }

  removeTrack(track) {
    const newList = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({
      playlistTracks: newList,
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;