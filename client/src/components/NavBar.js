import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';


const navbar = ( props ) => {
  return (
    <div id="main">
      <div className="topnav" style = {props.style}>
        <div id="left"  className="active navButton">Spotify Recommender</div>
        <div id="right">Created with React.js ღ</div>
      </div>
    </div>
  )
}

export default navbar;
