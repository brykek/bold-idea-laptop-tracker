-- Create database
CREATE DATABASE LaptopTracker;

-- Use the created database
USE LaptopTracker;

-- Create the laptops table
CREATE TABLE laptops (
  serialNumber VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  laptopId VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  donor VARCHAR(255) NOT NULL,
  dateDonated DATE NOT NULL,
  model VARCHAR(255) NOT NULL,
  screenSize INT NOT NULL,
  cpuType VARCHAR(255) NOT NULL,
  memory INT NOT NULL,
  diskSize INT NOT NULL,
  condition VARCHAR(255) NOT NULL,
  chargerType VARCHAR(255) NOT NULL,
  chargerIncluded TINYINT(1) NOT NULL,
  tradeInValue FLOAT NOT NULL,
  listPrice FLOAT NOT NULL,
  soldPrice FLOAT NOT NULL,
  notes VARCHAR(255),
  createdDate DATE NOT NULL,
  lastEdited DATE NOT NULL,
  archivedDate DATE
);

-- Create the users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);