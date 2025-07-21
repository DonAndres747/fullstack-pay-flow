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
  address TEXT,
  phone VARCHAR(255)
);
 
CREATE TABLE transaction (
  id CHAR(36) PRIMARY KEY,  
  product_id INT NOT NULL,
  customer_id INT,
  quantity INT NOT NULL DEFAULT 1,
  status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING', 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

USE fullstack_pay_flow;

INSERT INTO product (name, description, price, stock) VALUES
('Wireless Headphones', 'Bluetooth headphones with noise cancelling.', 239900, 20),
('Smartphone Stand', 'Adjustable stand for all phone models.', 29900, 35),
('USB-C Charger', 'Fast-charging USB-C adapter.', 49900, 50),
('Laptop Sleeve', 'Protective sleeve for 13-inch laptops.', 0, 0),
('Bluetooth Speaker', 'Portable speaker with deep bass.', 149900, 15),
('Webcam HD', '1080p webcam ideal for streaming and meetings.', 109900, 25),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches.', 199900, 15),
('Gaming Mouse', 'Ergonomic mouse with programmable buttons.', 89900, 25),
('HDMI Cable 2m', 'High-speed HDMI cable for 4K displays.', 17900, 100),
('External SSD 1TB', 'Portable 1TB solid state drive with USB-C.', 359900, 10),
('Wireless Mouse', 'Compact and silent wireless mouse.', 59900, 30),
('Smart Light Bulb', 'Color-changing bulb with app control.', 32900, 40),
('Desk Organizer', 'Wooden desk organizer with compartments.', 0, 0),
('Notebook Stand', 'Aluminum stand for ergonomic laptop use.', 69900, 35),
('Noise Cancelling Earbuds', 'In-ear headphones with ANC.', 149900, 18),
('Portable Monitor', '15.6-inch USB-C portable monitor.', 429900, 8),
('Dummy Product 1', 'This is a dummy product for testing purposes.', 1000, 100),
('Dummy Product 2', 'This is a dummy product for testing purposes.', 2000, 50),
('Dummy Product 3', 'This is a dummy product for testing purposes.', 3000, 75),
('Dummy Product 4', 'This is a dummy product for testing purposes.', 4000, 0),
('Dummy Product 5', 'This is a dummy product for testing purposes.', 5000, 80),
('Dummy Product 6', 'This is a dummy product for testing purposes.', 6000, 30),
('Dummy Product 7', 'This is a dummy product for testing purposes.', 7000, 20),
('Dummy Product 8', 'This is a dummy product for testing purposes.', 8000, 25),
('Dummy Product 9', 'This is a dummy product for testing purposes.', 9000, 15),
('Dummy Product 10', 'This is a dummy product for testing purposes.', 10000, 10);
