const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// דף הבית – מציג את כל הספרים
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('pages/home', {
            title: 'חנות ספרים',
            books,
            pageStyle: 'home',
        });
    } catch (err) {
        console.error('❌ שגיאה בשליפת ספרים:', err.message);
        res.render('pages/home', {
            title: 'שגיאה',
            books: [],
            pageStyle: 'home',
            error: 'לא ניתן לטעון את רשימת הספרים',
        });
    }
});

module.exports = router;
