const SpotifyWebApi = require('spotify-web-api-node');
const tf = require('@tensorflow/tfjs-node');

const spotifyApi = new SpotifyWebApi({
  clientId: '9f0b2038f4eb4d5883a3a763f41af17b',
  clientSecret: 'b369a26265744c70900c28fef832b8d2',
  redirectUri: 'https://www.getpostman.com/oauth2/callback'
});

spotifyApi.setAccessToken('BQDaU9V6PVPwUDSfHt-KmufH-nzqUEGYSnVFdj_LSGzm_keE-EITWTWwsXSS1Sg9ayORh-wtMelmflwheYDasIVfcVIP7aQtzgCU1Z-5bKclrfxOjI3RLiHSGARg3WMpwshF3DNEieP9csc1YHx4oqbRF6fbU6HU0QuGTIDfTiflzB35QyPFjP9NTxqj5IW8Lw087PiIPD-bBQQ');

let data_offset = 0;
let max_songs = 10;
let features = [];
let tracks_name = [];
let labels = []
let done = false;
let k = 3;
let jsonData = {}
let target = ['7htu5ftbLBRFAwiuHVcUAg'];
let req_path = 'https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg';

labels  =[];


getPlaylistTracks('https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg');


//Takes a url
function getPlaylistTracks(path) {
	let playlist_id = path.substring(37, 59);
		// Get tracks in a playlist
		spotifyApi.getPlaylistTracks(playlist_id, { offset: data_offset, limit: 10 })
		.then( function(data) {
		    	let items = data.body['items'];
		    	let temp_track_ids = [];

		    	for(let i = 0; i < items.length; i++) {
					let artists = items[i]['track']['artists'][0]['name'];
			    	let name = items[i]['track']['name'];
			    	let id = items[i]['track']['id'];
			    	tracks_name.push([artists, name, id]);
			    	labels.push(id);
			    	temp_track_ids.push(id);

					//console.log("Track: " + (offset + i) + " Artist: " + artists + " Song: " + name + " Id: " + id); 
	    		}

	    		data_offset += 100
	    		console.log('The playlist contains these tracks'+ data.body['next']);
	     		return [temp_track_ids, data.body['next']];
		    	
	    }).then(function(data){
	    		console.log("starign11111")
	    		if(data[1] == null || data_offset >= max_songs) done = true;
		  		getTrackInfo(data[0]);
		  	return data;
		}).then(function(data){
			console.log("starign2222222")
			if(data[1] != null && data_offset < max_songs) {
				getPlaylistTracks(data[1]);
			}
			return data;
		}).catch(function(err) {
			console.error('Error occurred: ' + err); 
		}); 
};




function getTrackInfo(arr){
	spotifyApi.getAudioFeaturesForTracks(arr)
	  .then(function(data) {
	  	console.log("getinggg11");
	    let items = data.body['audio_features'];
	    for(let track_indx = 0; track_indx < items.length; track_indx++) {
	    	console.log("getingggyyyy");
	    	let track_arr = []
	    	for(let audio_feature in items[track_indx]) {
	    		if(audio_feature == 'acousticness' || audio_feature == 'danceability' || audio_feature == 'energy' || audio_feature == 'instrumentalness' || audio_feature == 'liveness' || audio_feature == 'loudness' || audio_feature == 'speechiness' || audio_feature == 'valence' || audio_feature == 'tempo') {
	    			let val = items[track_indx][audio_feature]
		    		if(audio_feature == 'loudness') {
			    		val = Math.abs(val /= 60.0);
		    		} else if(audio_feature == 'tempo') {
		    			val /= 225.0;
		    		}
		    		track_arr.push(val);
		    	}
	    	}
	    	features.push(track_arr);
	    }

	  }, function(err) {
	  	console.log("ERROR: " + err);
	  }).then(function(data) {
	  	console.log("Length: ", labels.length);
	  	console.log("Done: " + done);
	  	if(done) runTensor(features, Array.from(Array(labels.length).keys()), k);

	  });
}

function runTensor(features, labels, k) {

	tffeatures = tf.tensor(features);
	tflabels = tf.tensor(labels).expandDims(1);
	tfpred = tf.tensor(features[3]);
	//tflabels.print()
	getKNN(tfpred, tffeatures, tflabels, k)[2];



}


function getKNN(predicitionPoint, features, labels, k) {
	return features.sub(predicitionPoint).pow(2).sum(1).sqrt().expandDims(1).concat(labels, 1).unstack().sort((a, b) => { 
		//console.log(a.arraySync()[0]);
		return a.arraySync()[0] - b.arraySync()[0] }).slice(0,k);
}