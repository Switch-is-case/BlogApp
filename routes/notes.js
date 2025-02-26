const express = require('express');
const Note = require('../models/Note');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth'); // Заменяем ensureAuth

const router = express.Router();

// Получение всех заметок пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 }); 

        res.render('dashboard', { user: req.user, notes, posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Создание новой заметки
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        await Note.create({ title, content, user: req.user.id });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Удаление заметки
router.post('/delete/:id', authMiddleware, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Обновление заметки
router.post('/edit/:id', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        await Note.findByIdAndUpdate(req.params.id, { title, content });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
