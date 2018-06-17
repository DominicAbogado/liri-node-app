require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var SpotifyWebApi = require("spotify-web-api-node");

var inquirer = require("inquirer");

var spotify = new SpotifyWebApi(keys.spotify);
var client = new twitter(keys.twitter);

spotify.getArtistAlbums('Taylor Swift').then(
  function(data) {
    console.log('Artist albums', data.body);
  },
  function(err) {
    console.error(err);
  }
);

var myTweets = "my-tweets";
var mySong = "spotify-this-song";
var myMovie = "movie-this";
var myDo = "do-what-it-says";

// //Twitter Function
// function postTweet() {
//   client.get("statuses/user_timeline", function(error, tweets, response) {
//     if (error) {
//       console.log("Wrong");
//     }
//     for (var i = 0; i < tweets.length; i++) {
//       console.log("------------------------------------------");
//       console.log("Created at: " + tweets[i].created_at);
//       console.log("text: " + tweets[i].text);
//       console.log("------------------------------------------");
//     }
//   });
// }



// //LIRI Inquire Function
// inquirer.prompt([
//   {
//     type: "confirm",
//     message: "Welcome to LIRI! \n I can perform a number of functions for you \n please confirm to continue!",
//     name: "opening",
//   },
//   {
//     type: "list",
//     message: "Please choose one of the following commands:",
//     choices: ["my-tweets", "end game"],
//     name: "action"
//   }
// ]).then(function(ir){
//   if(ir.action === "my-tweets"){
//     console.log("Here for your most recent tweets!");
//     postTweet();
//   } else {
//     console.log("Thank you for playing!")
//   }
// });

// if (process.argv[2] == myTweets) {
//   postTweet();
// } else {
//   console.log("What would you like me to do?");
// }


// Spotify API
