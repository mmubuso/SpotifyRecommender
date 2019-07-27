const express = require('express')


const LargePlaylistAPI = require('../models/LargePlaylist.js')


const LargePlayListRouter = express.Router()

//Returns the entire playlist from the database
LargePlayListRouter.get('/', (req, res) => {
  LargePlaylistAPI.getAllTracks()
    .then((tracks) => {
      console.log(tracks)
      res.send(tracks)
    })
    .catch(err => console.log(err))
})

//Creates a new playlist object
LargePlayListRouter.post('/', (req, res) => {
  LargePlaylistAPI.createLargeSpotifyPlaylist(req.body)
    .then((tracks) => res.send(tracks))
    .catch(err => console.log(err))
})

//delete all the playlist items
LargePlayListRouter.delete('/:largePlayListId',(req, res) => {
  LargePlaylistAPI.deleteAllItems(req.params.largePlayListId)
    .then(() => res.send('delete was successful'))
    .catch(err => console.log(err))
})

//Update a specific playlist by its playlist ID
LargePlayListRouter.put('/:largePlayListId', (req,res) => {
  LargePlaylistAPI.updateLargeSpotifyPlaylist(req.params.largePlayListId,req.body)
    .then(() => res.send('Update was successful'))
    .catch(err => console.log(err))
})

module.exports = {
  LargePlayListRouter
}
