require('dotenv').config();
const mysql = require('mysql2/promise');

async function addProducts() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    const products = [
        {
            name: 'Heavy Premium Baggy Pants',
            description: 'Gen Z stylish heavy premium baggy pants for extra comfort and drip.',
            price: 1500,
            image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
            category: 'Pants'
        },
        {
            name: 'Premium Caps',
            description: 'Trendy premium caps to complete your outfit.',
            price: 500,
            image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
            category: 'Accessories'
        }
    ];

    for (const p of products) {
        try {
            await pool.execute(
                `INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`,
                [p.name, p.description, p.price, p.category, p.image_url]
            );
            console.log(`Added ${p.name}`);
        } catch(e) {
            console.log(`Failed or already exists: ${p.name}`);
        }
    }
    
    process.exit(0);
}

addProducts();
