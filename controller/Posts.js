const { Posts } = require("../models/Posts");
const slugify = require("slugify");

exports.createPost = async (req, res) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: "-",
      lower: true,
      strict: true,
    });
    req.body.slug = slug;
    req.body.author = req.session.username;
    const newTime = new Date();
    req.body.dateTime =
      newTime.toDateString() + " " + newTime.toLocaleTimeString();
    req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
    req.body.image = req.file.filename;
    const newPosts = new Posts(req.body);
    const response = await newPosts.save(newPosts);
    res.status(201).json({ Success: "Post Successfully added" });
  } catch (err) {
    res.status(400).json({ ERROR: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const pId = req.params.postId;
    const dPost = await Posts.deleteOne({ _id: pId });
    res.status(201).json({ Success: "Post Successfully deleted" });
  } catch (err) {
    res.status(400).json({ ERROR: err.message });
  }
};
