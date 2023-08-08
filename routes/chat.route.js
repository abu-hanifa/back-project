const { Router } = require("express");
const { chatController } = require("../controllers/chat.controller");

const router = Router();

router.get("/user-chats/:userId", chatController.findUserChats);
router.get("/user-chat", chatController.findChat);
router.post("/user-chat", chatController.createChat);

module.exports = router;
