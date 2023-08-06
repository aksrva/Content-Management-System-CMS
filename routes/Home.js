const express = require("express");
const { userLogout } = require("../controller/Users");
const { homePage, readPost } = require("../controller/Home");
const rout = express.Router();

rout.get("/", homePage);
rout.get("/login", (req, res) => {
  if (req.session.isuserAuth) {
    res.redirect("/");
  } else {
    res.render("index", { page: "login", username: req.session.username });
  }
});
rout.get("/signup", (req, res) => {
  if (req.session.isuserAuth) {
    res.redirect("/");
  } else {
    res.render("index", { page: "signup", username: req.session.username });
  }
});
rout.get("/logout", userLogout);
rout.get("/:slug", readPost);

exports.rout = rout;
