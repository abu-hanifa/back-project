const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  subName: String,
  login: String,
  password: String,
  contacts: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Contact'
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
