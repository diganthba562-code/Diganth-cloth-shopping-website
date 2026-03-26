const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.warn('Database error, providing mock data for products...');
        res.json([
            { id: 1, name: 'Essential Oversized Hoodie', price: 79.99, image_url: '/assets/premium_hoodie.png' },
            { id: 2, name: 'Premium Vintage Denim Jacket', price: 95.00, image_url: '/assets/premium_denim_jacket.png' },
            { id: 3, name: 'Heavyweight Oversized Premium Tee', price: 45.00, image_url: '/assets/premium_oversized_tee.png' },
            { id: 5, name: 'Phantom Knit Sneakers', price: 120.00, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' }
        ]);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
