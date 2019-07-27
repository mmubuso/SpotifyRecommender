
import React, { Component } from 'react'
import './SideBar.css'

export default class SideBar extends Component {
    state = {
        // name: 'Musiteli',
        // image: 'https://images.unsplash.com/photo-1562841883-85e49a4c02c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        // followers: 0,
        // email: 'mindTestModis@gmail.com',
        // name: this.props.display_name,
        // image: this.props.prof_pic,
        // followers: this.props.followers
    }

    render() {
        // //Destructued state object into properties
        // let { name, image, followers, email } = this.state;
        // this.state.email=this.props.email
        // this.state.name= this.props.display_name,
        // this.state.image: this.props.prof_pic,
        // this.state.followers: this.props.followers


        return (
            <div className="SideBarContainer">
                <div className="profileImg">
                    <img src={this.props.prof_pic} alt='profile of user' />
                </div>
                <div className="SideBarDescription">
                    <h2>Name: {this.props.display_name}</h2>
                    <h2>Followers: {this.props.followers}</h2>
                    <h2>Email: {this.props.email}</h2>
                </div>
            </div>
        )
    }
}
