const Chat = require("../models/Chat.model");

module.exports.chatController = {
  createChat: async (req, res) => {
    try {
      const { firstId, secondId } = req.body;
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
      });
      if (chat) return res.status(200).json(chat);
      const newChat = await Chat.create({
        members: [firstId, secondId],
      });
      res.status(200).json(newChat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findUserChats: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log();
      const chats = await Chat.find({ members: { $in: [userId] } });
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findChat: async (req, res) => {
    try {
      const { firstId, secondId } = req.body;
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
