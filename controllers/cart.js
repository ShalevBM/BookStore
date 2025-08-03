const Cart = require('../models/Cart');
const Book = require('../models/Book');

// עגלה זמנית (כשמסד הנתונים לא זמין)
let tempCart = {
    items: []
};

// ======================= הצגת עגלה =======================
exports.getCart = async (req, res) => {
    try {
        const userId = req.session?.userId || 'default-user';
        let cart = await Cart.findOne({ user: userId }).populate('items.book');

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }

        res.render('pages/cart', {
            title: 'עגלת קניות',
            cart,
            pageStyle: 'cart',
            error: null
        });
    } catch (error) {
        console.log('❌ Database error, using temp cart');

        res.render('pages/cart', {
            title: 'עגלת קניות - זמני',
            cart: tempCart,
            pageStyle: 'cart',
            error: "משתמש בעגלה זמנית (מסד נתונים לא זמין)"
        });
    }
};

// ======================= הוספת ספר לעגלה =======================
exports.addToCart = async (req, res) => {
    const { bookId, quantity = 1, bookTitle, bookPrice } = req.body;
    const userId = req.session?.userId || 'default-user';

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'הספר לא נמצא' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.book.toString() === bookId);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.items.push({ book: bookId, quantity: parseInt(quantity) });
        }

        await cart.save();
        res.json({ success: true, message: 'הספר נוסף לעגלה' });
    } catch (error) {
        console.log('❌ Cannot add to cart - using temp cart');

        const existingItem = tempCart.items.find(item => item.book._id === bookId);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            tempCart.items.push({
                book: {
                    _id: bookId,
                    title: bookTitle || 'ספר',
                    price: bookPrice || 0
                },
                quantity: parseInt(quantity)
            });
        }

        res.json({ success: true, message: 'הספר נוסף לעגלה (זמני)' });
    }
};

// ======================= הסרת ספר מהעגלה =======================
exports.removeFromCart = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.session?.userId || 'default-user';

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'העגלה לא נמצאה' });
        }

        cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        await cart.save();

        res.json({ success: true, message: 'הספר הוסר מהעגלה' });
    } catch (error) {
        console.log('❌ Cannot remove from cart - using temp cart');

        tempCart.items = tempCart.items.filter(item => item.book._id !== bookId);
        res.json({ success: true, message: 'הספר הוסר מהעגלה (זמני)' });
    }
};

// ======================= עדכון כמות =======================
exports.updateQuantity = async (req, res) => {
    const { bookId } = req.params;
    const { quantity } = req.body;
    const userId = req.session?.userId || 'default-user';

    if (quantity < 1) {
        return res.status(400).json({ error: 'הכמות חייבת להיות לפחות 1' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'העגלה לא נמצאה' });
        }

        const item = cart.items.find(item => item.book.toString() === bookId);
        if (!item) {
            return res.status(404).json({ error: 'הספר לא נמצא בעגלה' });
        }

        item.quantity = parseInt(quantity);
        await cart.save();

        res.json({ success: true, message: 'הכמות עודכנה' });
    } catch (error) {
        console.log('❌ Cannot update quantity - using temp cart');

        const item = tempCart.items.find(item => item.book._id === bookId);
        if (item) {
            item.quantity = parseInt(quantity);
        }

        res.json({ success: true, message: 'הכמות עודכנה (זמני)' });
    }
};
