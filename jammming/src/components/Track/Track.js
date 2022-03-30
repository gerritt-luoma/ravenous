import React from "react";

import './Track.css';

class Track extends React.Component {
  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>filler</h3>
          <p>artist | album</p>
        </div>
        <button className="Track-action">{this.props.isRemoval ? '-': '+'}</button>
      </div>
    );
  }
}

export default Track;