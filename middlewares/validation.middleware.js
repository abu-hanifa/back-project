import { body } from 'express-validator';

export const loginValidation = [
    body('phone', 'Неверный формат номера телефона').isMobilePhone('any', { strictMode: false }),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('phone', 'Неверный формат номера телефона').isMobilePhone('any', { strictMode: false }),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('subName', 'Укажите фамилию').isLength({ min: 3 }),
    // body('avatarUrl', 'Неверная ссылка на аватарку').isURL(),
];
