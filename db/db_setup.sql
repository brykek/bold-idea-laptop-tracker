-- Create database
CREATE DATABASE LaptopTracker;

-- Use the created database
USE LaptopTracker;

-- Create the laptops table
CREATE TABLE laptops (
  serialNumber VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255),
  laptopId VARCHAR(255),
  status VARCHAR(255),
  donor VARCHAR(255),
  dateDonated DATE,
  model VARCHAR(255),
  screenSize INT,
  cpuType VARCHAR(255),
  memory INT,
  diskSize INT,
  condition VARCHAR(255),
  chargerType VARCHAR(255),
  chargerIncluded TINYINT,
  tradeInValue DECIMAL(10,2),
  listPrice DECIMAL(10,2),
  soldPrice DECIMAL(10,2),
  notes VARCHAR(255),
  createdDate DATE,
  lastEdited DATE,
  archivedDate DATE
);

-- Create the users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

