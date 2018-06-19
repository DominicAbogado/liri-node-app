// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var inquirer = require("inquirer")

var args = process.argv.slice(2)
  
  // Then run a request to the OMDB API with the movie specified
  //OMDB Functionality
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
  

// ])
// .then(function(ir) {
//   inquirer.prompt([{
//     type: "confirm",
//     message: "The movie you typed was: " + ir.movieTitle + "\n Is this correct?",
//     name: "movieConfirm",
//     default: true
//   }

// getMovie() 
// function getMovie() {
//   request(
//     "http://www.omdbapi.com/?t=" +
//       args +
//       "&y=&plot=short&tomatoes=true&apikey=trilogy",
//     function(error, response, body) {
//       // If the request is successful (i.e. if the response status code is 200)
//       if (!error && response.statusCode === 200) {
//         var mv = JSON.parse(body);
//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         console.log("Movie Title: " + mv.Title);
//         console.log("------------------------------------------");
//         console.log("Released: " + mv.Released);
//         console.log("------------------------------------------");
//         console.log("IMDB Rating: " + mv.imdbRating);
//         console.log("------------------------------------------");
//         ;
//         if(mv.tomatoMeter == "N/A"){
//           console.log("Rotten Tomatoes Score Not Available For This Title")
//         } else {
//           console.log("Rotten Tomatoes Score: " + mv.tomatoMeter);
//         }
//         console.log("------------------------------------------");
//         console.log("Produced in: " + mv.Country);
//         console.log("------------------------------------------");
//         console.log("Language: " + mv.Language);
//         console.log("------------------------------------------");
//         console.log("Plot: " + mv.Plot);
//         console.log("------------------------------------------");
//         console.log("Starring: " + mv.Actors);
//         console.log("------------------------------------------");
//       }
//     }
//   );
