var express  = require('express')
var expresshdb  = require('express-handlebars')
var mongoose  = require('mongoose')
var bodyparser  = require('body-parser')
var cheerio  = require('cheerio')
var request  = require('request')

var PORT = process.env.PORT || 3000;

var app = express()

app.use(express.static('public'))

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Make a request call to grab the HTML body from the site of your choice
request("https://lifehacker.com", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("article").each(function(i, element) {

    var summary = $(element).find(".excerpt.entry-summary").children("p").text();
    // .children("div").children("div").children("p").text()
    var link = $(element).children("header").children("h1").children("a").attr("href");
    var headline = $(element).children("header").children("h1").children("a").text();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      headline,
      link,
      summary

    });
  });

  console.log(results);
});


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });