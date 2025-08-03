const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

// מחזיר את כל הספרים
exports.getAllBooks = async (req, res) => {
    try {
        const db = getDb();
        const books = await db.collection('books').find().toArray(); // שימוש ב-toArray במקום forEach
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch the documents." });
    }
};

// מחזיר ספר לפי מזהה
exports.getBookById = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid document ID format" });
    }

    try {
        const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch the document." });
    }
};

// יוצר ספר חדש
exports.createBook = async (req, res) => {
    const db = getDb();
    const { title, author, price } = req.body;

    if (!title || !author || price == null) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const result = await db.collection('books').insertOne({ title, author, price });
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not create new document' });
    }
};

// מעדכן ספר לפי מזהה
exports.updateBook = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid document ID format" });
    }

    const { title, author, price } = req.body;

    try {
        const result = await db.collection('books').updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, author, price } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json({ message: "Book updated" });
    } catch (err) {
        res.status(500).json({ error: "Could not update the document." });
    }
};

// מוחק ספר לפי מזהה
exports.deleteBook = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid document ID format" });
    }

    try {
        const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete the document." });
    }
};
