const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user"); 
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://127.0.0.1:27017/games')
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
