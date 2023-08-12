const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation.middleware");
const handleValidationError = require("../middlewares/handleValidationError");

router.post(
  "/registration",
  registerValidation,
  handleValidationError,
  userController.registration
); // Регистрация пользователя
router.post(
  "/login",
  loginValidation,
  handleValidationError,
  userController.login
); // Вход в учетную запись
router.get("/user", authMiddleware, userController.getUser); // вывод пользователя
router.get("/find-user/:id", userController.findUser); // вывод пользователя
router.get("/find-users", userController.getUsers); // вывод пользователя
router.patch("/user/update", authMiddleware, userController.updateUser); // изменение данных
router.delete("/user/delete", authMiddleware, userController.deleteUser); // удаление пользователя
router.get('/contact/:id', userController.getContact)//вывод контактов пользователя
router.patch('/contact/:id',userController.patchContact )
router.delete('/contact/:id', userController.deleteContact)
module.exports = router;
