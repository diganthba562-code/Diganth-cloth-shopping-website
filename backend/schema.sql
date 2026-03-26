CREATE DATABASE IF NOT EXISTS digant_db;
USE digant_db;

-- Set Timezone to IST (Indian Standard Time)
SET GLOBAL time_zone = '+05:30';
SET time_zone = '+05:30';

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Fresh Inventory for "Diganth" (Exactly 4 Items: Hoodie, Sweatshirt, Tee, Shoes)
TRUNCATE TABLE products;
INSERT INTO products (name, description, price, image_url, category) VALUES
('Essential Oversized Hoodie', 'Heavyweight cotton-blend hoodie with a modern oversized fit and kangaroo pocket.', 1300.00, '/assets/premium_hoodie.png', 'Hoodie'),
('Premium Vintage Denim Jacket', 'Classic distressed denim jacket with a modern fit and heavy-duty stitching.', 2400.00, '/assets/premium_denim_jacket.png', 'Jacket'),
('Heavyweight Oversized Premium Tee', 'Boxy, oversized silhouette with dropped shoulders and a thick ribbed collar.', 700.00, '/assets/premium_oversized_tee.png', 'T-shirt'),
('Premium Retro Air Jordans', 'Iconic high-top sneakers with premium leather and classic colorblocking.', 10000.00, '/assets/premium_jordans.png', 'Shoes');
