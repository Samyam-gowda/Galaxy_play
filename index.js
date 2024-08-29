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


  app.get("/home" ,(req,res) => {
    res.render("index.ejs");
  });
  
  app.post("/home/login", async (req, res) => {
    let { username, password } = req.body;
    try {
      let details = await User.find({ username: username });
      console.log("Details:", details);
  
      if (details.length > 0) {
        let temp = details[0].username;
        let temp2 = details[0].password;
  
        console.log("Retrieved username:", temp);
  
        globalName = details[0].username;
        console.log(globalName);
        if (temp === username && temp2 === password) {
          console.log("Username and password match. Working.");
          res.render("home.ejs");
        } else {
          console.log("Username or password does not match. Not working.");

          res.redirect("/home/new");
        }
      } else {
        console.log("No user found. Not working.");
        res.redirect("/home/login");
      }
    } catch (err) {
      console.log("Error:", err);
      res.redirect("/home/login");
    }
  });
  
  app.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
  });