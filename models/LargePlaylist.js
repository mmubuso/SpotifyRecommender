const mongoose = require('./connection.js')


const TrackSchema = new mongoose.Schema({
  features: {
    type: Array,
    default: [1, 2, 3]
  },
  labels: {
    type: Array
  },
  track_information: {
    type: Array
  }
})


const TracksCollection = mongoose.model('Track', TrackSchema)

//Grab the entire list of tracks and track name
function getAllTracks() {
  console.log("TracksCollection.find(): ", TracksCollection.find())
  return TracksCollection.find()
}

// //Create the the object that has a two dimensional arra
// function createLargeSpotifyPlaylist(tracksObject) {
//   // console.log("tracksObject: ", tracksObject)
//
//   // { name: 'string', size: 'string' }
//   // return TracksCollection.create({tracksObject})
//   return TracksCollection.create({features: [[91], [91], [91]], labels: [81, 82, 83], track_information: [71, 72, 73]})
// }

function createLargeSpotifyPlaylist(tracksObject) {
  console.log("tracksObject: ", tracksObject)
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
