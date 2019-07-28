import React, { Component } from 'react'
import './MainBody.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Recommender from '../Recommender/Recommender';
import Search from '../Search/Search';
import axios from 'axios'
export default class MainBody extends Component {

    //Store the state of the song selected by the user and the 
    //  features returned by that song Id
    state = {
        features: {},
        reccomenderPlaylist: []
    }

    //This function stores the id of the song selected by the user in state
    //Pass this method down to search componenet 
    runFunctionsToUpdateRecommenderPlaylist = async (newSongId) => {
        await this.useSongIdToGetFeatures(newSongId)
        //place the tensor method here so that it runs as soon as as the 
        //  features have been grabbed and uploaded to state

    }

    //Use the songId to create a list of features
    useSongIdToGetFeatures = async (songId) => {
        try {
            let res = await axios({
                url: `https://api.spotify.com/v1/audio-features/?ids=${songId}`,
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${this.props.token}`
                }
            })
            let songFeatures = res.data.audio_features[0]
            await this.setState({ features: songFeatures })
        } catch (err) {
            console.log('Error: ' + err)
        }
    }

    render() {

        //Create components that will needs props below this line 
        //If the component doesnt need props, then create as usual
        //Example let RecommenderComponent = () => <Recommender songId={this.state.songId}/>
        //Then use the render method to have the component show
        let SearchComponent = () => <Search
            songId={this.state.songId}
            sendSongToGetFeatures={this.runFunctionsToUpdateRecommenderPlaylist}
            token={this.props.token} />

        let RecommenderComponent = () => <Recommender
            playlist={this.state.reccomenderPlaylist}
            token={this.props.token}
        />

        return (
            <Router >
                <div id="mainbody">
                    <Switch>
                        <Route exact path='/callback' render={SearchComponent} />
                        <Route path='/recommender' render={RecommenderComponent} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
