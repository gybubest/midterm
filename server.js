// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Routes
const homepage = require("./routes/home");
const pollCreation = require("./routes/new");
const links = require("./routes/links");
const thanks = require("./routes/thanks")
const pollResult = require("./routes/result");
const pollResponse = require("./routes/response");

// Mount all resource routes
app.use("/", homepage(db));
app.use("/new", pollCreation(db));
app.use("/thanks", thanks());
app.use("/links/:id", links(db));
app.use("/my/:id", pollResult(db));
app.use("/:id", pollResponse(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
