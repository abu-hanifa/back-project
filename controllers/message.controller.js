const Message = require("../models/message.model");

module.exports.messageController = {
  createMessage: async (req, res) => {
    try {
      const { chatId, senderId, text } = req.body;
      const message = await Message.create({ chatId, senderId, text });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMessages: async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
