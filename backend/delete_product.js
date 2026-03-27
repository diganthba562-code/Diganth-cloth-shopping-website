require('dotenv').config();
const mysql = require('mysql2/promise');

async function deleteProduct() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    try {
        await pool.execute(
            `DELETE FROM products WHERE name = ?`,
            ['Premium Joggers']
        );
        console.log('Successfully deleted Premium Joggers');
    } catch(e) {
        console.error('Delete failed:', e.message);
    }
    
    process.exit(0);
}

deleteProduct();
