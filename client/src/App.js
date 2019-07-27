import React, {Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import MainBody from './components/MainBody'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SideBar from './components/SideBar'
import * as $ from "jquery";
import hash from "./msc/hash";
import Particles from 'react-particles-js';
import ParticlesComponent from './components/ParticlesComponent'

class App extends Component  {
// render(){
//   return (<div>
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%"
//       }}
//     >
//       <ParticlesComponent />
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%"
//         }}
//       >
//
//       <BrowserRouter>
//                 <div className="App">
//                   <NavBar></NavBar>
//                   <div id="info">
//                   <SideBar email = {"test"} prof_pic = {"test"}  display_name = {"test"} followers = {0}></SideBar>
//                   <MainBody></MainBody>
//                   </div>
//                 </div>
//               </BrowserRouter>
//       </div>
//     </div>
//   </div>
//   );
// }
//
//
//



 // render() {return(
  // <BrowserRouter>
  //   <div className="App">
  //
  //     <Particles
  //               params={{
  //                   "particles": {
  //                       "line_linked": {
  //                                   "color":"#FFFFFF"
  //                                   },
  //                       "number": {
  //                           "value": 150
  //                       },
  //                       "size": {
  //                           "value": 5
  //                       }
  //                   },
  //                   "interactivity": {
  //                       "events": {
  //                           "onhover": {
  //                               "enable": true,
  //                               "mode": "repulse"
  //                           }
  //                       }
  //                   }
  //               }}
  //               style={{
  //                       width: '100%',
  //                       background: `#000000`
  //                }}
  //               />
  //     <NavBar></NavBar>
  //     <div id="info">
  //     <SideBar email = {"test"} prof_pic = {"test"}  display_name = {"test"} followers = {0}></SideBar>
  //     <MainBody></MainBody>
  //     </div>
  //   </div>
  // </BrowserRouter>)}






  constructor() {
    super();
    this.state = {
      token: null,
      prof_pic: "",
      display_name: "",
      email: "",
      followers: 0,
      authEndpoint: 'https://accounts.spotify.com/authorize?',
      clientId: "9f0b2038f4eb4d5883a3a763f41af17b",
      redirectUri: "http://localhost:3000/callback",
      scopes: [
        "user-read-currently-playing",
        "user-read-playback-state",
      ]
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      console.log("token:" + _token)
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          prof_pic: data.images[0].url,
          display_name: data.display_name,
          email: data.email,
          followers: data.followers.total,
        });

    },
    error: function(data) {
      console.log("failed data: " + data);
  }
    });
  }

  render() {

    return (
      <div>

        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href= {this.state.authEndpoint+ 'client_id=' + this.state.clientId + '&redirect_uri=' + this.state.redirectUri + '&scope=' + this.state.scopes.join("%20") + '&response_type=token&show_dialog=true'}
          >
            Login to Spotify
          </a>
        )}

        {this.state.token && (
          // <div
          //   style={{
          //     position: "absolute",
          //     top: 0,
          //     left: 0,
          //     width: "100%",
          //     height: "100%"
          //   }}
          // >
          //   <ParticlesComponent />
          //   <div
          //     style={{
          //       position: "absolute",
          //       top: 0,
          //       left: 0,
          //       width: "100%",
          //       height: "100%"
          //     }}
          //   >

          <BrowserRouter>
            <div className="App">
              <NavBar></NavBar>
              <div id="info">
              <SideBar email = {this.state.email} prof_pic = {this.state.prof_pic}  display_name = {this.state.display_name} followers = {this.state.followers}></SideBar>
              <MainBody></MainBody>
              </div>
            </div>
          </BrowserRouter>

        //   </div>
        // </div>
       )}
      </div>
    );
  }
}

export default App;
