# MySQL Database Setup
This guide will help you set up a MySQL database and run the SQL scripts to set up the database schema for the LaptopTracker app.

## Prerequisites
Before getting started, ensure you have the following tools installed:

- MySQL Server Community v8.0.33.0
- MySQL Command Line Client

## Installation Steps
1. Open the MySQL Command Line Client and log in to your MySQL server using your username and password. 
    **Note:** The root user password needs to match the password in configured in `index.js` in the backend project.

    `mysql.server start`
    `mysql -h localhost -u root -p`
    
2. Run the `db_setup` SQL script to set up the database and schema. You can run the script using the following command:

    `source /path/to/db_setup.sql`

3. Once the database and tables have been created, configure the MySQL Command Line Client to use the new LaptopTracker database.

    `\u LaptopTracker`

4.  Seed the database with data provided in the `dropdown_init` SQL script.

    `source /path/to/dropdown_init.sql`


5. Create a superadmin user using the `create_admin.js` script. You will need to set values for database credentials and the superadmin user's credentials. Set the role to "superadmin". 

    `node create_admin.js`

Congratulations! You have successfully set up the MySQL database and created the necessary tables for the LaptopTracker app.