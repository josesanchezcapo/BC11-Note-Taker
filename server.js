// Dependencies
const fs = require("fs");
const path = require('path');
const express = require("express");


// Create instance of express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes file
require('./routes/routes')(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  