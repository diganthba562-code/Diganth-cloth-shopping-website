const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.warn('Database error, providing mock data for products...');
        res.json([
            { id: 1, name: 'Premium Silk Shirt', price: 89.99, image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=1000&auto=format&fit=crop' },
            { id: 2, name: 'Modern Denim Jacket', price: 129.50, image_url: 'https://images.unsplash.com/photo-1576871333021-69fd1df0636f?q=80&w=1000&auto=format&fit=crop' },
            { id: 3, name: 'Urban Cargo Pants', price: 75.00, image_url: 'https://images.unsplash.com/photo-1624372927054-944a957b0ee5?q=80&w=1000&auto=format&fit=crop' },
            { id: 4, name: 'Designer Wool Coat', price: 249.00, image_url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop' }
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
