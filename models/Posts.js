const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true, unique: true, lowercase: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  image: { type: String, required: true },
  metaDesc: { type: String, require: true },
  desc: { type: String, required: true, lowercase: true },
  category: { type: String, required: true, lowercase: true },
  tags: { type: Array, required: true, lowercase: true },
  author: { type: String, required: true, lowercase: true },
  dateTime: { type: String, required: true, lowercase: true },
});
// Create Model
exports.Posts = mongoose.model("Posts", postSchema);
