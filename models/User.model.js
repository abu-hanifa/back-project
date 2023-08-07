const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  subName: String,
  login: String,
  password: String,
  email: String,

});

const User = mongoose.model("User", userSchema);
module.exports = User;
