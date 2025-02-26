const express = require('express');
const Post = require('../models/Post');  // Импорт модели постов

const router = express.Router();

// Получение всех постов для отображения на главной странице
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Получаем все посты, сортируем по дате
        res.render('home', { posts });  // Передаем посты в шаблон
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
