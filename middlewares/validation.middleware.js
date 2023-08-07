const { body } = require('express-validator');

const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('subName', 'Укажите фамилию').isLength({ min: 3 }),
    // body('avatarUrl', 'Неверная ссылка на аватарку').isURL(),
];

module.exports = {
    loginValidation,
    registerValidation
};
