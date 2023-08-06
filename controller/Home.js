const { Posts } = require("../models/Posts");
exports.homePage = async (req, res) => {
  try {
    const allPost = await Posts.find();
    res.render("index", {
      page: "home",
      username: req.session.username,
      posts: allPost,
    });
  } catch (err) {
    res.status(400).json({ ERROR: err.message });
  }
};
exports.readPost = async (req, res, next) => {
  try {
    if (req.params.slug === "login" || req.params.slug === "signup") {
      next();
    } else {
      const slug = req.params.slug;
      const post = await Posts.findOne({ slug: slug });
      res.render("index", {
        page: "details",
        username: req.session.username,
        post: post,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
