-- 1. Create a MySQL Database called `bamazon`.
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:
--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).


CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,3) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Arctic King 3.2 Cubic Feet Two Door Mini Refrigerator with Freezer, Black','Appliances','163','10');


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Toshiba EM925A5A-BS Microwave Oven with Sound On/Off ECO Mode ','Appliances','89.98','10');


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('PurSteam Garment Steamer for Clothes','Appliances','24.97','10');


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Wrangler Authentics Mens Relaxed Fit Jean','Clothings','49.99','20');

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Levi's Men's 550 Relaxed-fit Jean","Clothings","59.99","10");


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('East At Main Langdon Brown Round Abaca Coffee Table,','Garden','297.55','10');


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Nest (T3007ES) Learning Thermostat','Smart home','209.79','10');


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('ecobee4 Smart Thermostat with Built-In Alexa,','Smart home','228.00','20');

select * from products;