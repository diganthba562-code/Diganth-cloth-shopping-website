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

-- Fresh Inventory for "Diganth"
TRUNCATE TABLE products;
INSERT INTO products (name, description, price, image_url, category) VALUES
('Luxe Cashmere Sweater', 'Ultra-soft cashmere wool blend for ultimate comfort and style.', 149.99, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop', 'Sweaters'),
('Midnight Velvet Blazer', 'Sophisticated velvet blazer with a slim-fit tailored silhouette.', 189.99, 'https://images.unsplash.com/photo-1507679799987-c7377ec48696?q=80&w=1000&auto=format&fit=crop', 'Jackets'),
('Artisan Leather Boots', 'Handcrafted genuine leather boots with a rugged yet polished look.', 219.00, 'https://images.unsplash.com/photo-1520639889313-7272a747ca90?q=80&w=1000&auto=format&fit=crop', 'Footwear'),
('Satin Evening Gown', 'Elegant floor-length satin gown for high-end evening events.', 165.50, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop', 'Dresses'),
('Tailored Linen Trousers', 'Breathable Italian linen trousers, perfect for summer elegance.', 95.00, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop', 'Pants'),
('Minimalist Essential Tee', 'Premium heavy-weight cotton tee in a clean, minimalist fit.', 45.00, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop', 'Tees');
