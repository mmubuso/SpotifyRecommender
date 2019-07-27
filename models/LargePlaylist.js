const mongoose = require('./connection.js')


const TrackSchema = new mongoose.Schema({
  features: {
    type: Object
  },
  labels: {
    type: Object
  }
})


const TracksCollection = mongoose.model('Track', TrackSchema)

//Grab the entire list of tracks and track name
function getAllTracks() {
  return TracksCollection.find()
}

//Create the the object that has a two dimensional arra
function createLargeSpotifyPlaylist(tracksObject) {
  return TracksCollection.create(tracksObject)
}

//Delete every item in the database
function deleteAllItems() {
  return TracksCollection.deleteMany()
}

//Update a playlist by its specific id
function updateLargeSpotifyPlaylist (playListId, newPlayList) {
  return TracksCollection.findByIdAndUpdate(playListId, newPlayList)
}

module.exports = {
  getAllTracks,
  createLargeSpotifyPlaylist,
  deleteAllItems,
  updateLargeSpotifyPlaylist
}
