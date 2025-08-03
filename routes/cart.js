const express = require('express'); // מייבא את express
const router = express.Router();    // יוצר ראוטר חדש
const cartController = require('../controllers/cart'); // מייבא את הקונטרולר של העגלה

// הצגת עגלה
router.get('/cart', cartController.getCart); 
// בקשת GET תציג את עגלת המשתמש

// הוספת ספר לעגלה
router.post('/cart/add', cartController.addToCart); 
// בקשת POST תוסיף ספר חדש לעגלה

// הסרת ספר מהעגלה
router.delete('/cart/remove/:bookId', cartController.removeFromCart); 
// בקשת DELETE תסיר ספר לפי מזהה

// עדכון כמות של ספר בעגלה
router.put('/cart/quantity/:bookId', cartController.updateQuantity); 
// בקשת PUT תעדכן את הכמות של ספר בעגלה

module.exports = router; // מייצא את הראוטים לשימוש בקובץ app.js
