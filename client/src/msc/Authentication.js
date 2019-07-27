import React, { Component } from "react";
import "./Authentication.css";
import * as $ from "jquery";



// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


class PlayBack extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms:0,
    },
    is_playing: "Paused",
    progress_ms: 0,
    authEndpoint: 'https://accounts.spotify.com/authorize?',
    // Replace with your app's client ID, redirect URI and desired scopes
    clientId: "9f0b2038f4eb4d5883a3a763f41af17b",
    redirectUri: "http://localhost:3000/callback",
    scopes: [
      "user-read-currently-playing",
      "user-read-playback-state",
    ]
  };
  this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);




  }
  getCurrentlyPlaying(token) {
    // Make a call using the token

    console.log("token: " + token)
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      }
    });
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }
render() {
  return (
    <div className="App">
      <header className="App-header">
      {!this.state.token && (

        <a
          className="btn btn--loginApp-link"
          href= {this.state.authEndpoint+ 'client_id=' + this.state.clientId + '&redirect_uri=' + this.state.redirectUri + '&scope=' + this.state.scopes.join("%20") + '&response_type=token&show_dialog=true'}
          >
          Login to Spotifyii
        </a>
      )}
      {this.state.token && (
        <Player
          item={this.state.item}
          is_playing={this.state.is_playing}
          progress_ms={this.progress_ms}
        />
      )}
      </header>
    </div>
  );
  }
}
export default PlayBack;
