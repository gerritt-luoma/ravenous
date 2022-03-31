import React from "react";

import TrackList from "../TrackList/TrackList";
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;