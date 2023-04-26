# Laptop Tracker Backend
This is a simple web application built with Node.js and React for tracking laptop inventory. The application uses MySQL as a database and exposes REST APIs for retrieving, adding, editing and deleting laptop data.

## Prerequisites
- Node.js and npm installed on your system

## Installation
Install the required dependencies by running `npm install`

Create a MySQL database and update the database configuration in the app.js file with your database credentials.

## Running the application
Run the application using `node index.js`

## API Endpoints
The following API endpoints are available in the application:

- POST /signup: This endpoint is used for creating a new user account.
- POST /login: This endpoint is used for user authentication.
- GET /inventory: This endpoint returns a list of all laptops in the inventory.
- POST /add: This endpoint is used for adding a new laptop to the inventory.
- PUT /edit/apple/:serialnumber: This endpoint is used for editing the details of an existing laptop in the inventory.

## Usage
Once the application is running, you can access it at http://localhost:3001. From there, you can use the API endpoints to add, edit, or retrieve laptop data.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.