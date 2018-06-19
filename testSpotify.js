require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);

askSong();
function askSong(){
    inquirer
      .prompt([
        {
          type: "input",
          message:
            "Please type in the name of a song",
          name: "songTitle",
        }
      ])
      .then(function(ir) {
spotify
  .search({ type: 'track', query: ir.songTitle, limit: 1 })
  .then(function(response) {
    console.log("Artists: " + response.tracks.items[0].artists[0].name);
    console.log("------------------------------------------");
    console.log("Track Name: " + response.tracks.items[0].name);
    console.log("------------------------------------------");
    if (response.tracks.items[0].preview_url == null){
        console.log("No Preview for this song... Guess you have to listen on youtube!")
    } else{
    console.log("Listen to a preview here: " + response.tracks.items[0].preview_url);
    }
    console.log("------------------------------------------");
    console.log("Album: "+ response.tracks.items[0].album.name);

  })
  .catch(function(err) {
    console.log(err);
  });
})
};