const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth"); // Заменяем ensureAuth

// Создание поста
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content,
            author: req.user.id,
        });
        await newPost.save();
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Получение формы редактирования поста
// Получение формы редактирования поста
router.get("/edit/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || !post.author.equals(req.user.id)) {
            return res.redirect("/dashboard");
        }
        res.render("editPost", { post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Обновление поста
router.post("/edit/:id", authMiddleware, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post || !post.author.equals(req.user.id)) {
            return res.redirect("/dashboard");
        }
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Удаление поста
router.post("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || !post.author.equals(req.user.id)) {
            return res.redirect("/dashboard");
        }
        await Post.deleteOne({ _id: req.params.id });
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;