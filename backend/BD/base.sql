CREATE DATABASE bd_restaurnt




CREATE TABLE `sql10425003`.`Users` ( 
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `fullName` VARCHAR(100) NOT NULL , 
     `userName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL , 
    `password` VARCHAR(100) NOT NULL ,
     `rol` BOOLEAN NOT NULL DEFAULT FALSE  
)

CREATE TABLE Porducts(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre VAR(100),
    precio int
)


CREATE TABLE Pedido(
    id int AUTO_INCREMENT PRIMARY KEY,
    estado VAR(100),
    Producto_id int,
    precio_total,
    User_id int,
    FOREIGN KEY (Product_id) REFERENCES Products(id),
    FOREIGN KEY (User_id) REFERENCES Users(id)
]


SELECT * 
FROM Orders 
INNER JOIN Users ON Users.id = Orders.user_id 
INNER JOIN Details ON Details.detail_id = Orders.detail_id
INNER JOIN Products ON Details.product_id = Products.product_id