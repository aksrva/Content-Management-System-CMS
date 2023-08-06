const express = require("express");
const { profilePage } = require("../controller/Profile");
const rout = express.Router();

rout.get("/", profilePage);

rout.get("/add-post", (req, res) => {
  res.render("index", { page: "addPost", username: req.session.username });
});
exports.rout = rout;
