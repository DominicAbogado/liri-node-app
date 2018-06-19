require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var SpotifyWebApi = require("spotify-web-api-node");
var request = require("request");

var inquirer = require("inquirer");

var spotify = new SpotifyWebApi(keys.spotify);
var client = new twitter(keys.twitter);

spotify.getArtistAlbums("Taylor Swift").then(
  function(data) {
    console.log("Artist albums", data.body);
  },
  function(err) {
    console.error(err);
  }
);

var myTweets = "my-tweets";
var mySong = "spotify-this-song";
var myMovie = "movie-this";
var myDo = "do-what-it-says";

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

//OMDB Function
function getMovie() {
  request(
    "http://www.omdbapi.com/?t=" +
      movieTitle +
      "&y=&plot=short&tomatoes=true&apikey=trilogy",
    function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        var mv = JSON.parse(body);
        console.log("Movie Title: " + mv.Title);
        console.log("------------------------------------------");
        console.log("Released: " + mv.Released);
        console.log("------------------------------------------");
        console.log("IMDB Rating: " + mv.imdbRating);
        console.log("------------------------------------------");
        if (mv.tomatoMeter == "N/A") {
          console.log("Rotten Tomatoes Score Not Available For This Title");
        } else {
          console.log("Rotten Tomatoes Score: " + mv.tomatoMeter);
        }
        console.log("------------------------------------------");
        console.log("Produced in: " + mv.Country);
        console.log("------------------------------------------");
        console.log("Language: " + mv.Language);
        console.log("------------------------------------------");
        console.log("Plot: " + mv.Plot);
        console.log("------------------------------------------");
        console.log("Starring: " + mv.Actors);
        console.log("------------------------------------------");
      }
    }
  );
}

//LIRI Inquire Function
inquirer
  .prompt([
    {
      type: "confirm",
      message:
        "Welcome to LIRI! \n I can perform a number of functions for you \n please confirm to continue!",
      name: "opening"
    },
    {
      type: "list",
      message: "Please choose one of the following commands:",
      choices: [myTweets, myMovie, "end game"],
      name: "action"
    }
  ])
  .then(function(ir) {
    if (ir.action === MyTweets) {
      console.log("Here for your most recent tweets!");
      postTweet();
    } else if (ir.action === myMovie) {
    } else {
      console.log("Thank you for playing!");
    }
  });

if (process.argv[2] == myTweets) {
  postTweet();
} else {
  console.log("What would you like me to do?");
}

// Spotify API
