require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: 'Heatstroke', limit: 1 })
  .then(function(response) {
    console.log("Artists: " + response.tracks.items[0].artists[0].name);
    console.log("------------------------------------------");
    console.log("Track Name: " + response.tracks.items[0].name);

  })
  .catch(function(err) {
    console.log(err);
  });