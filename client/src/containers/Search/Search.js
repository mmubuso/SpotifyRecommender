import React, { Component } from 'react'
import axios from 'axios'
import './Search.css'
import { Link } from 'react-router-dom'

export default class Search extends Component {

    //Store state of current information
    state = {
        searchField: '',
        listOfSongs: [],
        showSearchButton: true,
        searchUrl: '',
    }

    //Store user search input in state searchfield 
    updateUserInputOnChange = (event) => {
        event.preventDefault();
        let searchItem = event.target.value;
        this.setState({ searchField: searchItem });
    }

    //Turn string in the search field into a to query parameter for api call
    turnSearchFieldIntoQuery = async (str) => {
        let searchQuery = `q=${str.replace(/ /g, '%20')}&type=track&limit=10`;
        await this.setState({ searchUrl: searchQuery })
    }

    //Handle actions when submit is pressed
    requestSongTracks = async (event) => {
        event.preventDefault()
        if (this.state.searchField !== '') {
            await this.turnSearchFieldIntoQuery(this.state.searchField)
            this.getListofSongsFromSpotify(this.state.searchUrl)
            this.setState({searchField: ''})
        }
    }

    //Make API call to spotify to get the list of songs that match the search entered by user
    //  store the returned list in the listOfSongs array
    getListofSongsFromSpotify = (url) => {
        axios({
            url: `https://api.spotify.com/v1/search?${url}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }
        }).then(res => {
            let listOfSongs = res.data.tracks.items
            this.setState({ listOfSongs: listOfSongs },
                this.toggleSearchView)

        }).catch(err => console.log(`Error : ${err}`))
    }

    //toggle the view to show the list of songs or the search
    toggleSearchView = () => {
        this.setState(state => {
            return { showSearchButton: !state.showSearchButton}
        })
    }


    render() {

        //Destructure state so that it can be used in the render method without adding 
        //  this.state to access a value
        let { listOfSongs, showSearchButton } = this.state

        //Create list of songs
        let songList = listOfSongs.map(song => {
            return (
                <div
                    className='singleSong'
                    onClick={() => this.props.sendSongToGetFeatures(song.id)}
                    key={song.id}
                    id={song.id}>
                    <hr />
                    <h2>{`${song.artists[0].name} - ${song.name}`}</h2>
                </div>
            )
        })
        return (

            <div id="searchContainer"
                className="row justify-content-center align-items-center">
                {
                    showSearchButton
                        ?
                        <form onSubmit={(event) => this.requestSongTracks(event)}
                            id="searchForm"
                            className="col-xs-10 col-md-12 row justify-content-center align-items-center">
                            <input
                                id="searchInputField"
                                type="text"
                                className="col-xs-12 col-md-12"
                                value={this.state.searchField}
                                onChange={(event) => this.updateUserInputOnChange(event)}
                                placeholder="Search Song" />
                            <button
                                id="searchButton"
                                type='submit'

                                className="">Submit</button>
                        </form>
                        :
                        <div id="songListDisplay"
                            className="col-xs-10 col-md-12">
                            {songList}
                            <button onClick={this.toggleSearchView}>Do Another Search</button>
                            <Link to='/recommender'>
                                <button className='goToRecommenderButton'>View Playlist</button>
                            </Link>
                        </div>
                }
            </div>
        )
    }
}
