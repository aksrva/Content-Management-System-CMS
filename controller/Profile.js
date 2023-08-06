const { Posts } = require("../models/Posts");
exports.profilePage = async (req, res) => {
  try {
    const allPost = await Posts.find({ author: req.session.username });
    res.render("index", {
      page: "profile",
      username: req.session.username,
      posts: allPost,
    });
  } catch (err) {
    res.status(400).json({ ERROR: err.message });
  }
};
