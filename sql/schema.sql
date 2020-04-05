DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

-- Makes it so all of the following code will affect favorite_db --
USE tracker_db;

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE favorite_foods (
  -- Makes a string column called "food" which cannot contain null --
  food VARCHAR(50) NOT NULL,
  -- Makes an numeric column called "score" --
  score INTEGER(10)
);

CREATE TABLE departments ( 
  id  INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE roles ( 
  id  INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6, 2) NOT NULL,
  department_id INT NOT NULL,

  PRIMARY KEY (id)

);

CREATE TABLE employee ( 
  id  INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT

  PRIMARY KEY (id)
);