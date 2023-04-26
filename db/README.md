# MySQL Database Setup

This guide will help you set up a MySQL database and run the SQL scripts to set up the database schema for the LaptopTracker app.

## Prerequisites
Before you get started, make sure you have the following installed:

- MySQL Server
- MySQL Command Line Client

## Installation Steps
1. Open the MySQL Command Line Client and log in to your MySQL server using your username and password.

    `mysql.server start`
    
    `mysql -h localhost -u root -p`

2. Create a new database named "LaptopTracker" using the following command:

    `CREATE DATABASE LaptopTracker;`

3. Select the database you just created by running the following command:

    `USE LaptopTracker;`

4. Run the SQL script to set up the database schema. The script is available in the db_setup.sql file. You can run the script using the following command:

    `source /path/to/setup_script.sql`

5. Verify that the tables have been created by running the following command:

    `SHOW TABLES;`
    
    You should see the following tables:

    - users
    - laptops

Congratulations! You have successfully set up the MySQL database and created the necessary tables for the LaptopTracker app.