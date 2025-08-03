const mongoose = require('mongoose'); // מייבא את mongoose – ספריית ODM שמקשרת בין Node.js ל-MongoDB

// מגדיר את הסכימה של ספר
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },       // כותרת הספר – חובה
  author: { type: String, required: true },      // שם המחבר – חובה
  price: { type: Number, required: true },       // מחיר – חובה
  description: { type: String },                 // תיאור – שדה רשות
  image: { type: String },                       // קישור לתמונה של הספר – שדה רשות
  category: { type: String },                    // קטגוריה של הספר – שדה רשות
  inStock: { type: Boolean, default: true }      // האם הספר במלאי – ברירת מחדל true
});

// מייצא את המודל Book לשימוש ברחבי הפרויקט
module.exports = mongoose.model('Book', bookSchema);
