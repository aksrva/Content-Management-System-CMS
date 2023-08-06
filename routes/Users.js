const {
  registerUser,
  loginUser,
  isuserAuth,
  restricted,
  userLogout,
} = require("../controller/Users");
const express = require("express");
const rout = express.Router();

rout.post("/register", registerUser);
rout.post("/login", loginUser);
rout.get("/restricted", isuserAuth, restricted);
rout.get("/logout", userLogout);
exports.rout = rout;
