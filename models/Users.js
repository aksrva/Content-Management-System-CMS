const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  useremail: { type: String, required: true, unique: true, lowercase: true },
  userpass: { type: String, require: true },
  firstname: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
});
// Create Model
exports.Users = mongoose.model("Users", userSchema);
