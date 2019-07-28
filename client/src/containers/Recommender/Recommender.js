import React, { Component } from 'react'
import './Recommender.css'
import PlayList from '../PlayList/PlayList'
import arrows from '../../assets/imgs/green-red-arrow.png'


class Recommender extends Component {
  state = {
      tracks1: [{name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
    {name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
    {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
    {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
    {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
    {name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
  {name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
  {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
  {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
  {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"}],

    tracks2: [{name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
  {name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
  {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
  {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
  {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
  {name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
{name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
{name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
{name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
{name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"}]


  }


  // {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
  // {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
  // {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
  // {name: "4Cut To The Feeling", artist: "4Carly Rae Jepsen", album: "4Cut To The Feeling"},
  // {name: "5Cut To The Feeling", artist: "5Carly Rae Jepsen", album: "5Cut To The Feeling"},
  // {name: "6Cut To The Feeling", artist: "6Carly Rae Jepsen", album: "6Cut To The Feeling"},
  // {name: "7Cut To The Feeling", artist: "7Carly Rae Jepsen", album: "7Cut To The Feeling"}
  //
  movetrack1totrack2(index){
      let trackList = [... this.state.tracks1]
      trackList.splice(index, 1);
      this.setState({tracks1: trackList})
      console.log("TRYINGG: ", this.state.tracks1.length);
  }



  render() {
    return (
      <div id="RecommenderContainer">
        <div className="RecommenderSubContianer">
          <div className="title_recommended">Recommended Songs:</div>
          <PlayList movetrack1totrack2={this.movetrack1totrack2.bind(this)} tracks = {this.state.tracks1} playlist_type = {"TrackContainer"}></PlayList>
        </div>

        <img src = {arrows} alt= {arrows} height={"150"} width={"150"}/>

        <div className="RecommenderSubContianer">
          <div className="title_playlist">Custom Playlist:</div>
          <PlayList movetrack1totrack2={this.movetrack1totrack2.bind(this)} tracks = {this.state.tracks2} playlist_type = {"customTrackContainer"}></PlayList>
        </div>
      </div>
    )
  }


  getData() {
    fetch('/users')
      .then(res => {
          console.log(res);
          return res.json()
       })
      .then(users => {
          console.log(users);
          this.setState({ users })
       });
  }
}

export default Recommender
