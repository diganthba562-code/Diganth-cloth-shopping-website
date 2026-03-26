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

INSERT INTO products (name, description, price, image_url, category) VALUES
('Premium Silk Shirt', 'A luxurious silk shirt for formal occasions.', 89.99, 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=1000&auto=format&fit=crop', 'Shirts'),
('Modern Denim Jacket', 'Classic denim jacket with a modern fit.', 129.50, 'https://images.unsplash.com/photo-1576871333021-69fd1df0636f?q=80&w=1000&auto=format&fit=crop', 'Jackets'),
('Urban Cargo Pants', 'Comfortable and stylish cargo pants for daily wear.', 75.00, 'https://images.unsplash.com/photo-1624372927054-944a957b0ee5?q=80&w=1000&auto=format&fit=crop', 'Pants'),
('Designer Wool Coat', 'Elegant wool coat perfect for winter.', 249.00, 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop', 'Coats');
