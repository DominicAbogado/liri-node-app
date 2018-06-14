require('dotenv').config()
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var myTweets = "my-tweets";
var mySong = "spotify-this-song";
var myMovie = "movie-this"
var myDo = "do-what-it-says"

console.log("Hello")