const mongoose = require('mongoose');
require('dotenv').config();

// בדיקה אם להשתמש ב-MongoDB מקומי או Atlas
const useLocalMongo = process.env.USE_LOCAL_MONGO === 'true';
let uri = useLocalMongo ? process.env.MONGODB_URI_LOCAL : process.env.MONGODB_URI_CLOUD;

// תיקון URI למסד נתונים מקומי - שימוש ב-IPv4 במקום localhost
if (useLocalMongo) {
    uri = uri.replace('localhost', '127.0.0.1');
}

console.log(`🔧 MongoDB Mode: ${useLocalMongo ? 'Local' : 'Atlas'}`);
console.log(`🔗 Connecting to: ${uri}`);

// התחברות למסד הנתונים
mongoose.connect(uri)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        console.log(`📍 Database: ${useLocalMongo ? 'Local' : 'Atlas'}`);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('💡 פתרונות:');
        
        if (useLocalMongo) {
            console.log('1. ודא ש-MongoDB מותקן ופועל');
            console.log('2. ודא שאין שגיאה ב-MONGODB_URI_LOCAL');
            console.log('3. שנה את USE_LOCAL_MONGO ל-false כדי לעבור ל-Atlas');
        } else {
            console.log('1. בדוק את ה-URI של Atlas');
            console.log('2. ודא שהאינטרנט פועל');
            console.log('3. שנה את USE_LOCAL_MONGO ל-true כדי לעבור למקומי');
        }

        console.log('🔄 ממשיך ללא חיבור למסד נתונים...');
    });

module.exports = mongoose;
