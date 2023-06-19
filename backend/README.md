# Laptop Tracker Backend
This is a simple web application built with Node.js and React for tracking laptop inventory. The application uses MySQL as a database and exposes REST APIs for retrieving, adding, editing and deleting laptop data.

## Prerequisites
Before getting started, ensure you have the following tools installed:

- Node.js v18.13.0
- npm v8.19.3

## Installation
Install the required dependencies by running `npm install`.

Create a MySQL database and update the database configuration in the `index.js` file with your database credentials.
Refer to the README in db project directory for additional details. 

## Running the application
Run the application using `node index.js`.

## API Endpoints
The following API endpoints are available in the application:

- GET /users - Get list of all users.
- POST /users - Create a new user.
- PUT /users: - Edit a user's role or password.
- DELETE /users/:id - Delete user by Id.
- POST /login - User authentication using username and password.
- GET /inventory - Get list of all laptops in inventory.
- GET /inventory/:id - Get laptop in inventory by Id.
- POST /add - Add a laptop to inventory.
- PUT /edit/:id - Edit a laptop in inventory by Id.
- GET /:dropdown - Get list of options to populate dropdown menu.
- PUT /:dropdown/:option - Add an option for specified dropdown menu category.
- DELETE /:dropdown/:option - Delete an option for specified dropdown menu category.

## Security 
Endpoints are secured and require a valid JWT to access resources. 
A token can be retrieved upon a successful login. 
Append the token as a Bearer token on all subsequent requests to secure endpoints. 

Login and user creation endpoints are the only ones publicly accessible.

Note that at time of deployment, a SUPERADMIN user will need to be created manually and entered into the system. A JavaScript code snippet can be created to generate the required information to be inserted into MySQL.

## Future Enhancements 
Some enhancements that can improve the application at a later date:
- Introduce type and character checks on Laptop and Dropdown types to strengthen against SQL injection vulnerabilities
- Introduce checks to verify resource exists for PUT/DELETE requests
- Rename endpoints to resource centric names 
- Introduce models
- Update application architecture using separate folders (e.g., routes, middleware, etc.)

## Usage
Once the application is running, you can access it at http://localhost:3001. From there, you can use the API endpoints to add, edit, or retrieve laptop data.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.