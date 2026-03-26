CREATE DATABASE IF NOT EXISTS digant_db;
USE digant_db;

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
('Essential Oversized Hoodie', 'Heavyweight cotton-blend hoodie with a modern oversized fit and kangaroo pocket.', 79.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop', 'Hoodie'),
('Signature Fleece Sweatshirt', 'Premium fleece-lined sweatshirt with ribbed cuffs and a classic crewneck.', 69.50, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop', 'Sweatshirt'),
('Graphic Streetwear Tee', 'Creative graphic print tee made from 100% fine-spun cotton.', 35.00, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop', 'T-shirt'),
('Phantom Knit Sneakers', 'Ultra-lightweight knit sneakers with reactive cushioning for all-day comfort.', 120.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop', 'Shoes');
