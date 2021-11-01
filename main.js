const express = require("express");
const app = express();
const path = require("path");
const config = (require("dotenv").config(), process.env);
const package = require("./package.json");
const Database = require("./database/db");

// Database
global.db = new Database(config.DB_PATH);

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Static Content
app.use(express.static(path.resolve(__dirname, "public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "views/index.html"));
});

// APIs Router
const apiRouter = require("./apis/wallet.js");
app.use("/api", apiRouter);

// App init
const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`${package.name} is running on 0.0.0.0:${port}`);
});
