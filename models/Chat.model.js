const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    members: [],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
