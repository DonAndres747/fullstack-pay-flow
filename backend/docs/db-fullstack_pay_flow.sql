CREATE DATABASE IF NOT EXISTS fullstack_pay_flow;
use fullstack_pay_flow;

DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS customer;

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0
);

CREATE TABLE customer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  address TEXT
);
 
CREATE TABLE transaction (
  id CHAR(36) PRIMARY KEY,  
  product_id INT NOT NULL,
  customer_id INT,
  quantity INT NOT NULL DEFAULT 1,
  status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

USE fullstack_pay_flow;

INSERT INTO product (name, description, price, stock) VALUES
('Wireless Headphones', 'Bluetooth headphones with noise cancelling.', 59.99, 20),
('Smartphone Stand', 'Adjustable stand for all phone models.', 12.50, 35),
('USB-C Charger', 'Fast-charging USB-C adapter.', 25.00, 50),
('Laptop Sleeve', 'Protective sleeve for 13-inch laptops.', 18.90, 40),
('Bluetooth Speaker', 'Portable speaker with deep bass.', 45.00, 15),
('Webcam HD', '1080p webcam ideal for streaming and meetings.', 39.00, 25),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches.', 79.99, 15),
('Gaming Mouse', 'Ergonomic mouse with programmable buttons.', 29.99, 25),
('HDMI Cable 2m', 'High-speed HDMI cable for 4K displays.', 8.75, 100),
('External SSD 1TB', 'Portable 1TB solid state drive with USB-C.', 110.00, 10),
('Wireless Mouse', 'Compact and silent wireless mouse.', 17.99, 30),
('Smart Light Bulb', 'Color-changing bulb with app control.', 13.50, 40),
('Desk Organizer', 'Wooden desk organizer with compartments.', 22.00, 20),
('Notebook Stand', 'Aluminum stand for ergonomic laptop use.', 27.99, 35),
('Noise Cancelling Earbuds', 'In-ear headphones with ANC.', 49.00, 18),
('Portable Monitor', '15.6-inch USB-C portable monitor.', 139.00, 8),
('Dummy Product 1', 'This is a dummy product for testing purposes.', 10.00, 100),
('Dummy Product 2', 'This is a dummy product for testing purposes.', 20.00, 50),
('Dummy Product 3', 'This is a dummy product for testing purposes.', 30.00, 75),
('Dummy Product 4', 'This is a dummy product for testing purposes.', 40.00, 60),
('Dummy Product 5', 'This is a dummy product for testing purposes.', 50.00, 80),
('Dummy Product 6', 'This is a dummy product for testing purposes.', 60.00, 30),
('Dummy Product 7', 'This is a dummy product for testing purposes.', 70.00, 20),
('Dummy Product 8', 'This is a dummy product for testing purposes.', 80.00, 25),
('Dummy Product 9', 'This is a dummy product for testing purposes.', 90.00, 15),
('Dummy Product 10', 'This is a dummy product for testing purposes.', 100.00, 10);
