
const crypto = require("crypto");
const mysql = require("mysql");

// Update these fields as needed
const username = "";
const password = "";
const firstName = "";
const lastName = "";
const role = "";

const salt = crypto.randomBytes(16);

// Update with DB credentials
const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
  });
  
  db.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to MySQL DB");
    }
  });

// Password must be at least 8 characters long and contain 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character.
const PASSWORD_REGEX = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
const ALPHANUMERIC_REGEX = new RegExp(/^[a-z0-9]+$/i);

if (typeof username !== "string" || typeof password !== "string" || typeof firstName !== "string" || typeof lastName !== "string") {
  console.log("Invalid type in one or more parameters.");
  return;
}
if (!ALPHANUMERIC_REGEX.test(firstName) || !ALPHANUMERIC_REGEX.test(lastName)) { 
  console.log("Invalid characters in firstname and/or lastname.");
  return;
}
if (!PASSWORD_REGEX.test(password)) { 
  console.log("Password does not meet complexity requirements.");
  return;
}

crypto.pbkdf2(password, salt, 310000, 32, "sha256", function(err, hashedPassword) {
    if (err) { return cb(err); }
    db.query(
      "INSERT INTO users (firstName, lastName, username, password, salt, role) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, username, hashedPassword, salt, role],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(`Successfully added user to DB: 
            Username: ${username}
            Firstname: ${firstName}
            Lastname: ${lastName}
            Password: ${password}
            Role: ${role}`
          );
          db.end();
        }
      }
    );
});
