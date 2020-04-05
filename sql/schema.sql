DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

-- Makes it so all of the following code will affect favorite_db --
USE tracker_db;

-- Creates the table "favorite_foods" within favorite_db --

CREATE TABLE department ( 
  id  INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUE 
("web_development"), 
("product"), 
("customer_service");

USE tracker_db;

CREATE TABLE role ( 
  id  INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,

  PRIMARY KEY (id)

);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Engineer", 70000.00, 1),
("Software Developer", 80000.00, 2),
("Phone Agent", 40000.00, 3);


USE tracker_db;

CREATE TABLE employee ( 
  id  INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT

  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sean", "King", 1, 1),
    ("Nick", "Thomas", 2, 2),
    ("Tucker", "Vassau", 3, 3),
    ("Tyler", "Snyder", 4, 4);