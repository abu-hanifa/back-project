const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  // Регистрация пользователя
  registration: async (req, res) => {
    const { login, password, name } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) {
      return res
        .status(401)
        .json({ error: "Пользователь с таким Логином уже существует" });
    }

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    const user = await User.create({
      name: name,
      login: login,
      password: hash,
    });
    res.json(user);
  },
  // Вход в учетную запись
  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login: login });
    if (!candidate) {
      return res.status(401).json({ error: "Неверный Логин или пароль" });
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный Логин или пароль" });
    }
    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "72h",
    });

    res.json({ ...payload, token });
  },
  // вывод одного пользователя
  getUser: async (req, res) => {
    try {
      const data = await User.findById(req.user.id);
      res.json(data);
    } catch (error) {
      res.json(`${error}: get user error`);
    }
  },
  findUser: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.json(`${error}: find user error`);
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (error) {
      res.json(`${error}: find users error`);
    }
  },
  // обновление данных пользователя
  updateUser: async (req, res) => {
    const { name, subName, phone, password } = req.body;
    const userId = req.user.id;
    try {
      // Найти пользователя по его ID
      const user = await User.findById(userId);
      console.log(userId);

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      // Обновить свойства пользователя
      user.name = name || user.name;
      user.subName = subName || user.subName;
      user.phone = phone || user.phone;
      user.password = password !== "" ? hash : user.password;

      // Сохранить обновленные данные пользователя
      await user.save();

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ошибка при обновлении данных пользователя" });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.user.id;

    try {
      // Найти пользователя по его ID
      await User.findByIdAndDelete(userId);

      res.json({ message: "Пользователь успешно удален" });
    } catch (error) {
      res.status(500).json({ error: "Ошибка при удалении пользователя" });
    }
  },
};
