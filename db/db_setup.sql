-- Create database
CREATE DATABASE LaptopTracker;

-- Use the created database
USE LaptopTracker;

-- Create the laptops table
CREATE TABLE laptops (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255),
  laptop_id VARCHAR(255),
  status VARCHAR(255),
  donated_by VARCHAR(255),
  date_donated DATE,
  model VARCHAR(255),
  screen_size VARCHAR(255),
  cpu_type VARCHAR(255),
  memory VARCHAR(255),
  disk_size VARCHAR(255),
  laptop_condition VARCHAR(255),
  charger_type VARCHAR(255),
  charger_included TINYINT,
  trade_in_value DECIMAL(10,2),
  list_price DECIMAL(10,2),
  sold_price DECIMAL(10,2),
  notes VARCHAR(255),
  created_date TIMESTAMP DEFAULT NOW(),
  last_edited TIMESTAMP,
  archived_date TIMESTAMP
);

-- Create the users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the dropdown options table
CREATE TABLE status (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE disk_size (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE screen_size (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE memory (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE laptop_condition (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE manufacturer (
  options VARCHAR(255) PRIMARY KEY
);

CREATE TABLE donated_by (
  options VARCHAR(255) PRIMARY KEY
);

