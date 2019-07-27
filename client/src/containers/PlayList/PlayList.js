import React, { Component } from 'react';
import './PlayList.css'
import Track from '../../components/Track'

class PlayList extends Component {
  state = {
    tracks: this.props.tracks
  }




  render() {
    return(
      <div id="PlayListContainer">
      {this.state.tracks.map((track, index) => {
        return (
          <Track movetrack1totrack2={this.props.movetrack1totrack2.bind(this)}  playlist_type = {this.props.playlist_type} name={track.name} artist={track.artist} album={track.album}></Track>
        )
      })}
      </div>
  )

  }

}

export default PlayList;
