const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/registration", userController.registration); // Регистрация пользователя
router.post("/login", userController.login); // Вход в учетную запись
router.get("/user", authMiddleware, userController.getUser); // вывод пользователя
router.get("/find-user/:id", userController.findUser); // вывод пользователя
router.get("/find-users", userController.getUsers); // вывод пользователя
router.patch("/user/update", authMiddleware, userController.updateUser); // изменение данных
router.delete("/user/delete", authMiddleware, userController.deleteUser); // удаление пользователя
module.exports = router;
