const { Router } = require("express");
const { messageController } = require("../controllers/message.controller");

const router = Router();

router.post("/user-message", messageController.createMessage);
router.get("/user-messages/:chatId", messageController.getMessages);

module.exports = router;
