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

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });