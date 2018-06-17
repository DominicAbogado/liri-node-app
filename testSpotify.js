require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var SpotifyWebApi = require("spotify-web-api-node");

var spotify = new SpotifyWebApi(keys.spotify);


