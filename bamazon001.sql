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
    product_sales DECIMAL(10,2) NULL,
    PRIMARY KEY (item_id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Tennis Racket', 'Sports', 80.00, 500, 0.00),
('Volleyball', 'Sports', 26.00, 2000, 0.00),
('WonderWoman', 'Comics', 95.00, 300, 0.00),
('Flat Screen TV', 'Electronics', 200.00, 150, 0.00),
('Laptop', 'Electronics', 200.00, 175, 0.00),
('PlayStation 3','Electronics', 80.00, 150, 0.00),
('Necklace','Jewelry', 90.00, 50, 0.00),
('Lawn Mower','Garden', 130.00, 75, 0.00),
('The Da Vinci Code','Books', 10.00, 50, 0.00),
('Hockey Stick','Sports', 8.00, 500, 0.00);

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NULL,
    over_head_costs DECIMAL (20,2) NULL,
    PRIMARY KEY (department_id)
    );
              
        
 INSERT INTO departments (department_name, over_head_costs)
 VALUES ('Sports','1000.00'),
 ('Comics','200.00'),
 ('Electronics','3000.00'),
 ('Jewelry','500.00'),
 ('Garden','700.00'),
 ('Books','200.00');
 
  
  
  SELECT departments.department_id, departments.department_name, departments.over_head_costs, temp.product_sales, (temp.product_sales -  departments.over_head_costs) as total_profit
FROM departments JOIN (SELECT department_name, SUM(product_sales) as product_sales FROM products GROUP BY department_name) as temp ON departments.department_name = temp.department_name;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, temp.product_sales, (temp.product_sales -  departments.over_head_costs) as total_profit
FROM departments JOIN (SELECT department_name, SUM(product_sales) as product_sales FROM products GROUP BY department_name) as temp ON departments.department_name = temp.department_name;    
