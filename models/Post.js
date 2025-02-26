const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

// Автоматически подставлять имя автора
PostSchema.pre(/^find/, function (next) {
    this.populate("author", "username"); // Подставляем только username
    next();
});

module.exports = mongoose.model("Post", PostSchema);
