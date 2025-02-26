const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const postsRoutes = require("./routes/posts");
const authMiddleware = require('./middleware/auth'); // Middleware для JWT
const User = require('./models/user');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser'); // Добавлен cookie-parser
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Подключение cookie-parser
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Маршруты с авторизацией
app.use('/notes', authMiddleware, notesRoutes);
app.use('/posts', authMiddleware, postsRoutes);
app.use(authRoutes);

// Дашборд
app.get('/dashboard', authMiddleware, (req, res) => {
    res.redirect('/notes');
});

// Профиль пользователя
app.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render('profile', { user });
    } catch (err) {
        console.error(err);
        res.render("error", { message: "Ошибка сервера" });
    }
});

// Обновление пароля
app.post('/update-password', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        await user.save();
        res.render("success", { message: "Пароль успешно обновлён" });
    } catch (err) {
        console.error(err);
        res.render("error", { message: "Ошибка сервера" });
    }
});

// Настройки загрузки аватара
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.user.id + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

app.post('/upload-avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.render("error", { message: "Файл не загружен" });
        }

        const user = await User.findById(req.user.id);
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.render("profile", { user, message: "Аватар успешно загружен" });
    } catch (err) {
        console.error(err);
        res.render("error", { message: "Ошибка сервера" });
    }
});

// Получение конкретного поста
app.get("/post/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.render("error", { message: "Пост не найден" });
        }
        res.render("post", { post });
    } catch (err) {
        console.error(err);
        res.render("error", { message: "Ошибка сервера" });
    }
});

// Главная страница с постами
app.get("/home", async (req, res) => {
    try {
        const posts = await Post.find();
        res.render("home", { posts });
    } catch (err) {
        console.error(err);
        res.render("error", { message: "Ошибка сервера" });
    }
});

// Главная страница
app.get("/", (req, res) => {
    res.render("index");
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
