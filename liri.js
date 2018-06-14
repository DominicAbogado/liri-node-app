require('dotenv').config()
var keys = require("./keys.js")
var twitter = require("twitter")

// var spotify = new Spotify(keys.spotify);
var client = new twitter (keys.twitter);


var myTweets = "my-tweets";
var mySong = "spotify-this-song";
var myMovie = "movie-this"
var myDo = "do-what-it-says"

// client.get('favorites/list', function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets);  // The favorites.
//     console.log(response);  // Raw response object.
//   });

var param = {
    count: 2,

}

client.get("statuses/user_timeline", function(error, tweets, response) {
    if(error){
        console.log("Wrong");
    };
    console.log(tweets);  // The favorites.
});
