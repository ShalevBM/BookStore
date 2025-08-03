const mongoose = require('mongoose'); // מייבא את mongoose – ספריית ODM לעבודה עם MongoDB

// מגדיר את סכימת העגלה
const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי של המשתמש
    ref: 'User',                          // קישור למודל של משתמש (אם יש לך אותו בפרויקט)
    required: true                        // שדה חובה
  },
  items: [ // מערך של פריטים בעגלה
    {
      book: { 
        type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי של הספר
        ref: 'Book',                          // קישור למודל הספר – חובה שיהיה מוגדר ב־Book.js
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 // הכמות צריכה להיות לפחות 1
      }
    }
  ],
  updatedAt: { 
    type: Date, 
    default: Date.now // תאריך עדכון אחרון – ברירת מחדל לזמן יצירה
  }
});

// מייצא את המודל Cart לשימוש ברחבי הפרויקט
module.exports = mongoose.model('Cart', cartSchema);
