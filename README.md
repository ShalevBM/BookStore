# 📚 חנות ספרים - Bookstore

פרויקט חנות ספרים מלא עם עגלת קניות, ניהול ספרים ותמיכה ב-MongoDB מקומי ו-Atlas.

## ✨ תכונות

- 📖 הצגת רשימת ספרים
- 🛒 עגלת קניות מלאה
- ➕ הוספת ספרים חדשים
- ✏️ עריכת ספרים קיימים
- 🗑️ מחיקת ספרים
- 📊 בחירת כמות מוצרים
- 💾 תמיכה ב-MongoDB מקומי ו-Atlas
- 📱 עיצוב רספונסיבי

## 🚀 התקנה והפעלה

### דרישות מקדימות

- Node.js (גרסה 14 ומעלה)
- MongoDB (מקומי או Atlas)

### שלב 1: הורדת הפרויקט

```bash
git clone <repository-url>
cd bookstore-master
```

### שלב 2: התקנת תלויות

```bash
npm install
```

### שלב 3: הגדרת משתני סביבה

צור קובץ `.env` בתיקיית הפרויקט:

```bash
cp env.example .env
```

ערוך את הקובץ `.env` עם ההגדרות שלך:

```env
# הגדרות שרת
PORT=5000

# מצב מסד נתונים - true = מקומי, false = Atlas
USE_LOCAL_MONGO=true

# חיבור ל-MongoDB מקומי
MONGODB_URI_LOCAL=mongodb://localhost:27017/bookstore

# חיבור ל-MongoDB Atlas (החלף עם ה-URI שלך)
MONGODB_URI_CLOUD=mongodb+srv://username:password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority

# הגדרות נוספות
NODE_ENV=development
SESSION_SECRET=your-super-secret-key-here
```

### שלב 4: הגדרת מסד הנתונים

#### אפשרות א: MongoDB מקומי

1. התקן MongoDB על המחשב שלך
2. הפעל את שירות MongoDB
3. הגדר `USE_LOCAL_MONGO=true` בקובץ `.env`

#### אפשרות ב: MongoDB Atlas

1. צור חשבון ב-[MongoDB Atlas](https://cloud.mongodb.com)
2. צור cluster חדש
3. קבל את connection string
4. החלף את `MONGODB_URI_CLOUD` עם ה-URI שלך
5. הגדר `USE_LOCAL_MONGO=false` בקובץ `.env`

### שלב 5: הפעלת הפרויקט

```bash
npm start
```

האפליקציה תיפתח בכתובת: `http://localhost:5000`

## ⚡ שימוש מהיר

### החלפת מסד נתונים:

**למסד נתונים מקומי:**
```env
USE_LOCAL_MONGO=true
```

**למסד נתונים Atlas:**
```env
USE_LOCAL_MONGO=false
```

### הוספת נתוני דוגמה:
```bash
npm run seed
```

## 📁 מבנה הפרויקט

```
bookstore-master/
├── controllers/          # לוגיקה עסקית
│   ├── booksView.js     # ניהול ספרים
│   └── cartController.js # ניהול עגלה
├── models/              # מודלים של מסד הנתונים
│   ├── Book.js         # מודל ספר
│   ├── Cart.js         # מודל עגלה
│   ├── User.js         # מודל משתמש
│   └── Order.js        # מודל הזמנה
├── routes/              # הגדרת נתיבים
│   ├── viewRoutes.js   # נתיבי תצוגה
│   └── cartRoutes.js   # נתיבי עגלה
├── views/               # תבניות EJS
│   ├── pages/          # דפי תוכן
│   └── partials/       # רכיבים משותפים
├── public/              # קבצים סטטיים
│   └── css/            # קבצי עיצוב
├── seeds/               # נתוני דוגמה
├── app.js              # הגדרות Express
├── server.js           # הפעלת שרת
└── db.js               # חיבור למסד נתונים
```

## 🛠️ שימוש באפליקציה

### דף הבית - רשימת ספרים
- הצגת כל הספרים במסד הנתונים
- כפתור "הוסף לעגלה" לכל ספר
- בחירת כמות לפני הוספה לעגלה
- כפתורי עריכה ומחיקה לספרים

### עגלת קניות
- הצגת כל הפריטים בעגלה
- עדכון כמות לכל פריט
- הסרת פריטים מהעגלה
- חישוב סכום כולל
- כפתור "המשך לתשלום"

### הוספת ספר חדש
- טופס מלא עם כל השדות
- בחירת קטגוריה
- תיאור אופציונלי
- ולידציה של שדות חובה

### עריכת ספר
- טופס עריכה עם נתונים קיימים
- שמירת שינויים
- ביטול שינויים

## 🔧 פיתוח

### הפעלת שרת פיתוח

```bash
npm start
```

### הוספת נתוני דוגמה

```bash
node seeds/seedBooks.js
```

## 📦 תלויות עיקריות

- **Express.js** - מסגרת שרת
- **MongoDB** - מסד נתונים
- **Mongoose** - ODM ל-MongoDB
- **EJS** - מנוע תבניות
- **dotenv** - ניהול משתני סביבה

## 🤝 תרומה

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

פרויקט זה מוגן תחת רישיון MIT.

## 📞 תמיכה

אם יש לך שאלות או בעיות, אנא פתח issue ב-GitHub או צור קשר.

---

**נהנה מהפרויקט! 📚✨** 