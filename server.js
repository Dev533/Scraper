var express  = require('express')
var expresshdb  = require('express-handlebars')
var mongoose  = require('mongoose')
var bodyparser  = require('body-parser')
var cheerio  = require('cheerio')
var request  = require('request')

var app = express()

app.use(express.static('public'))

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = "mongodb://Me:me@ds217310.mlab.com:17310/heroku_ndzz8gw2" || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(3000, function() {
    console.log("App running on port 3000!");
  });