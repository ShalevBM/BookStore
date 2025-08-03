// Middleware לניהול משתמשים
// לצורך הדוגמה, נשתמש ב-user ID קבוע
// במציאות אמיתית זה יהיה מה-session או JWT

exports.setDefaultUser = (req, res, next) => {
    // אם אין userId ב-session, נגדיר אחד קבוע
    if (!req.session.userId) {
        req.session.userId = 'default-user';
    }
    next();
};

exports.requireAuth = (req, res, next) => {
    // בדיקה אם המשתמש מחובר
    if (!req.session.userId) {
        return res.redirect('/login'); // במקרה אמיתי, תהיה דף התחברות
    }
    next();
}; 