const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.warn('Database error, providing mock data for products...');
        res.json([
            { id: 1, name: 'Luxe Cashmere Sweater', price: 149.99, image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop' },
            { id: 2, name: 'Midnight Velvet Blazer', price: 189.99, image_url: 'https://images.unsplash.com/photo-1507679799987-c7377ec48696?q=80&w=1000&auto=format&fit=crop' },
            { id: 3, name: 'Artisan Leather Boots', price: 219.00, image_url: 'https://images.unsplash.com/photo-1520639889313-7272a747ca90?q=80&w=1000&auto=format&fit=crop' },
            { id: 4, name: 'Satin Evening Gown', price: 165.50, image_url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop' },
            { id: 5, name: 'Tailored Linen Trousers', price: 95.00, image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop' },
            { id: 6, name: 'Minimalist Essential Tee', price: 45.00, image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop' }
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
