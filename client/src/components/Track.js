import React from 'react'
import './Track.css'


const track = (props) => {
  return(
    <div className={props.playlist_type} onClick={e => props.movetrack1totrack2()}>
      <div id="songName">{props.name}</div>
      <div id="artist_album">{props.artist} | {props.album} </div>
    </div>
  )

}

// add(){
//
// }
//
// remove(){
//
// }

export default track;
