require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);


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

// Spotify Function
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
  console.log('Error Occurred: ' + err);
});
})
};

//OMDB Function
function askMovie(){
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please type in the name of a movie",
        name: "movieTitle",
      }
    ])
    .then(function(ir) {
      request(
        "http://www.omdbapi.com/?t=" +
          ir.movieTitle +
          "&y=&plot=short&tomatoes=true&apikey=trilogy",
        function(error, response, body) {
          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode === 200) {
            
            var mv = JSON.parse(body);
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie Title: " + mv.Title);
            console.log("------------------------------------------");
            console.log("Released: " + mv.Released);
            console.log("------------------------------------------");
            console.log("IMDB Rating: " + mv.imdbRating);
            console.log("------------------------------------------");
            ;
            if(mv.tomatoMeter == "N/A"){
              console.log("Rotten Tomatoes Score Not Available For This Title")
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
      )
    });
  }

//LIRI Inquire Function
inquirer
  .prompt([
    {
      type: "confirm",
      message:
        "Welcome to LIRI! \n I can perform a number of functions for you! \n Would you like to continue!?",
      name: "opening"
    },
    {
      type: "list",
      message: "Please choose one of the following commands:",
      choices: ["My-Tweets","My-Movies", "My-Songs", "end game"],
      name: "action"
    }
  ])
  .then(function(ir) {
    if (ir.action === "My-Tweets") {
      console.log("Here for your most recent tweets!");
      postTweet();
    } else if (ir.action === "My-Movies") {
      askMovie();
    } else if (ir.action === "My-Songs") {
      askSong();
    } else {
      console.log("Thank you for playing!");
    }
  });
