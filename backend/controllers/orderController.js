const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const { customer_name, customer_email, items, total_amount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    try {
        // Start a transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // 1. Insert into orders table
            const [orderResult] = await connection.query(
                'INSERT INTO orders (customer_name, customer_email, total_amount) VALUES (?, ?, ?)',
                [customer_name, customer_email, total_amount]
            );

            const orderId = orderResult.insertId;

            // 2. Insert into order_items table
            const itemValues = items.map(item => [
                orderId,
                item.id,
                item.quantity,
                item.price
            ]);

            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
                [itemValues]
            );

            // Commit transaction
            await connection.commit();
            res.status(201).json({ message: 'Order placed successfully', orderId });
        } catch (err) {
            // Rollback on error
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('Order Error Detail:', err);
        // Provide more specific error if possible
        let errorMsg = 'Failed to place order';
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            errorMsg = 'Product not found in database. Please refresh and try again.';
        } else if (err.code === 'ER_NO_SUCH_TABLE') {
            errorMsg = 'Database tables not found. Please run the provided SQL script.';
        }
        res.status(500).json({ error: errorMsg, details: err.message });
    }
};
