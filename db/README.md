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

2. Run the SQL script to set up the database and schema. The script is available in the db_setup.sql file. You can run the script using the following command:

    `source /path/to/db_setup.sql`

Congratulations! You have successfully set up the MySQL database and created the necessary tables for the LaptopTracker app.