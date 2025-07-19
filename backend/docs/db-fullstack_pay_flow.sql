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

