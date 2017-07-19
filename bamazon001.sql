DROP DATABASE IF EXISTS bamazon123;

CREATE DATABASE bamazon123;

USE bamazon123;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(5,2) NULL,
    stock_quantity INTEGER(2) NULL,
    PRIMARY KEY (item_id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tennis Racket', 'Sports', 80.00, 500),
('Volleyball', 'Sports', 26.00, 2000),
('WonderWoman', 'Comics', 95.00, 300),
('Flat Screen TV', 'Electronics', 200.00, 150),
('Laptop', 'Electronics', 200.00, 175),
('PlayStation 3','Electronics', 80.00, 150),
('Necklace','Jewelry', 90.00, 50),
('Lawn Mower','Garden', 130.00, 75),
('The Da Vinci Code','Books', 10.00, 50),
('Hockey Stick','Sports', 8.00, 500);


