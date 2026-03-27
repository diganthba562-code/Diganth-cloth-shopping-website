require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateProduct() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    try {
        await pool.execute(
            `UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ? WHERE name = ?`,
            [
                'Premium Joggers', 
                800, 
                'High-quality premium joggers perfect for casual streetwear style.', 
                'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1000&auto=format&fit=crop',
                'Pants',
                'Premium Caps'
            ]
        );
        console.log('Successfully updated product to Premium Joggers');
    } catch(e) {
        console.error('Update failed:', e.message);
    }
    
    process.exit(0);
}

updateProduct();
