require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var SpotifyWebApi = require('spotify-web-api-node');

// var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var myTweets = "my-tweets";
var mySong = "spotify-this-song";
var myMovie = "movie-this";
var myDo = "do-what-it-says";

if(process.argv[2]== myTweets){
    postTweet();
}else {
    console.log("What would you like me to do?")
}
// client.get('favorites/list', function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets);  // The favorites.
//     console.log(response);  // Raw response object.
//   });

//Twitter Function
function postTweet() {
  client.get("statuses/user_timeline", function(error, tweets, response) {
    if (error) {
      console.log("Wrong");
    }
    for (var i = 0; i < tweets.length; i++) {
      console.log("------------------------------------------");
      console.log("Created at: " + tweets[i].created_at);
      console.log("text: " + tweets[i].text);
      console.log("------------------------------------------");
    }
  });
}

// Spotify API

// spotifyApi.setAccessToken(spotify.id).then(
//   function(data) {
//     console.log('Artist albums', data.body);
//   },
//   function(err) {
//     console.error(err);
//   }
// );
