const { isuserAuth } = require("../controller/Users");
const { createPost, deletePost } = require("../controller/Posts");
const express = require("express");
const rout = express.Router();
const multer = require("multer");
const uploadImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
      let img = Date.now() + "_" + file.originalname;
      cb(null, img);
    },
  }),
}).single("image");

rout.post("/upload-blog", isuserAuth, uploadImage, createPost);
rout.delete("/delete-blog/:postId", deletePost);

exports.rout = rout;
