DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Pencil", "School Supplies", 1.25, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Pen", "School Supplies", 1.75, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("TV", "Electronics", 400, 83);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Table", "Furniture", 50, 63);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Backpack", "School Supplies", 23, 86);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Chair", "Furniture", 20, 42);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Shirt", "Clothing", 15, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Shoes", "Clothing", 30, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Pants", "Clothing", 25, 100);
    
SELECT * FROM products;