const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Читаем куки
require('dotenv').config();

// Подключаем cookie-parser
router.use(cookieParser());

// 🔹 Страница логина
router.get('/login', (req, res) => {
    res.render('login');
});

// 🔹 Обработка логина с JWT
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

        // Генерация JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Ставим куку
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

        // 🔹 Возвращаем JSON с редиректом
        res.json({ message: "Successfull login", redirect: "/dashboard" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 Страница регистрации
router.get('/register', (req, res) => {
    res.render('register');
});

// 🔹 Обработка регистрации
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Register error" });
    }
});

// 🔹 Выход (удаление токена)
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.render('login');
});

module.exports = router;
