const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).render('login');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Неверный или просроченный токен" });
    }
};
