// Load the full build.
var _ = require('lodash');


function getClosest(target, choices) {
	let min_dist = 9999999;
	let min_indx = 100;
	let cur_indx = 0;

	console.log("CHOICES LENGTH: " + choices.length)
	choices.forEach(point => {
		let dist = distance(point, target);
		console.log("Distance: " + dist + " index: " + min_indx + " point: "+ point + " target: " + target);
		if(dist < min_dist) {
			min_dist = dist;
			min_indx = cur_indx;
			console.log("||Closest Artist: " + tracks_name[cur_indx][0] + ", Song: " + tracks_name[cur_indx][1]);
		}
		cur_indx++;
	});

	console.log("Closest Artist: " + tracks_name[min_indx][0] + ", Song: " + tracks_name[min_indx][1] +  ", Id: " + tracks_name[min_indx][2] + ", Data: " + tracks_data[min_indx]);


}



function distance(pointA, pointB) {
	//console.log("pointA: " + pointA + " pointB: " + pointB);
	let result = _.chain(pointA).zip(pointB).map(([a, b]) =>(a - b) ** 2).sum().value();
	Math.sqrt(result);
	return result;
}

function getTargetStats(id) {

	 spotifyApi.getAudioFeaturesForTracks(id)
	  .then(function(data) {
	    console.log(data.body['audio_features'].length);
	   
	    let items = data.body['audio_features'];
	    for(let track_indx = 0; track_indx < items.length; track_indx++) {
	    	let track_arr = []
	    	for(let audio_feature in items[track_indx]) {
	    		if(audio_feature == 'acousticness' || audio_feature == 'danceability' || audio_feature == 'energy' || audio_feature == 'instrumentalness' || audio_feature == 'liveness' || audio_feature == 'loudness' || audio_feature == 'speechiness' || audio_feature == 'valence' || audio_feature == 'tempo') {
	    			let val = items[track_indx][audio_feature]
		    		if(audio_feature == 'loudness') {
			    		val = Math.abs(val /= 60.0);
		    		} else if(audio_feature == 'tempo') {
		    			val /= 225.0;
		    		}
		    		target_tracks_data.push(val);
		    		console.log("feature: " + audio_feature + " val: " + val);
		    	}
	    	}
	    }
	  });

}

// const Spotify = require('node-spotify-api');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: '9f0b2038f4eb4d5883a3a763f41af17b',
  clientSecret: 'b369a26265744c70900c28fef832b8d2',
  redirectUri: 'https://www.getpostman.com/oauth2/callback'
});

spotifyApi.setAccessToken('BQA-6HBd4QX6uSrIvVHxMMdgaW23EZZLV4JQtI8BB1xo_pq5MOmmjR6iyr_1wKQGMEhMQIpgvRAcsvzhKuLDVI8BZ0YqFlUwKafNvXsE3Z-5B1-oUtGmMR8GLsqBP-BxB-RnbAMvSe_1_WckD0PFj_ZjLcHXe3T5Wh8T9jTETTGDIpIZW9TPfsIoRhhojJOGiq6bV32YiZuUVu0');


let data_offset = 0;
let max_songs = 19000;

let req_path = 'https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg';
//let req_path = 'https://api.spotify.com/v1/playlists/2a7fnf30vokGJnMds7MbdB';


let tracks_data = [];
let tracks_name = [];

let jsonData = {}
let target = ['1A6OTy97kk0mMdm78rHsm8'];
target_tracks_data  =[];
	

function getTrackInfo(arr){
	// Get Audio Features for several tracks 
	console.log("# of tracks: " + arr.length);
	console.log("Getting Info for all tracks ...")

	spotifyApi.getAudioFeaturesForTracks(arr)
	  .then(function(data) {
	    console.log(data.body['audio_features'].length);
	   
	    let items = data.body['audio_features'];
	    //console.log("first one: ", data.body['audio_features']);
	    for(let track_indx = 0; track_indx < items.length; track_indx++) {
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
		    		//console.log("feature: " + audio_feature + " val: " + val);
		    	}
	    	}
	    	tracks_data.push(track_arr);
	    }

	  }, function(err) {
	  	console.log("ERROR: " + err);
	  }).then(function(data) {
	  });
}

let track_ids = []

function getPlaylistTracks(path) {
	
	let playlist_id = path.substring(37, 59);
	let temp_track_ids = [];
	spotifyApi.getPlaylistTracks(playlist_id, { limit 100 : offset: data_offset}).then(function(data) {

	    let items = data.body['tracks']['items'];

		for(let i = 0; i < items.length; i++) {
			let artists = items[i]['track']['artists'][0]['name'];
	    	let name = items[i]['track']['name'];
	    	let id = items[i]['track']['id'];
	    	tracks_name.push([artists, name, id]);
	    	track_ids.push(id);
	    	temp_track_ids.push(id);
	    	//console.log("Track: " + (offset + i) + " Artist: " + artists + " Song: " + name + " Id: " + id); 
	    }

	     data_offset += 100
	     console.log("tracks_data length: " + track_ids.length);
	     return [temp_track_ids, data.body['tracks']['next']];
	    
	  }).then(function(data){
	  	//Get Track information 
	  	if(data[1] != null && data_offset < max_songs) {
	  		console.log("getting target: " + data[1]);
	  		getTrackInfo(data[0]);
	  	}
	  	return data;
	  })
	  .then(function(data){
	  	if(data[1] != null && data_offset < max_songs) {
	  		getPlaylistTracks(data[1]);
	  	}
	  	return data;
	  }).then(function(data) {
	  		if(data[1] == null || data_offset >= max_songs) {

	  	  		getTargetStats(target);	
	  	}
	  	return data;
	  }).then(function(data) {
	  	if(data[1] == null || data_offset >= max_songs) {
	  		console.log("data[1]: " + data[1] + " data_offset " + data_offset);
	  		console.log("getting closest");
		  	getClosest(target_tracks_data, tracks_data);
		  }
	  }).catch(function(err) {
	    console.error('Error occurred: ' + err); 
	  });
}


//getPlaylistTracks(req_path);


getTargetStats(target);	



/* Extra Helper Functions 

function printTrackData(){
	for(let i = 0; i < tracks_name.length; i++) {
		console.log("Artist: " + tracks_name[i][0] + ", Song: " + tracks_name[i][1] +  ", Id: " + tracks_name[i][2] + ", Data: " + tracks_data[i]);
	}
	
}



*/

