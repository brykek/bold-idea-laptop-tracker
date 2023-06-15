const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cors = require("cors");

const ROLES = require("./enums/roles");
const ERRORS = require("./enums/errors");

// TODO: Secret needs to be passed as app setting or env var during deployment 
const JWT_SECRET = "Thisisasecret";

// Passwords must be at least 8 chars long and contain 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character
const PASSWORD_REGEX = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
const ALPHANUMERIC_REGEX = new RegExp(/^[a-z0-9]+$/i);

const app = express();


// Configure universal app settings 
app.use(cors());
app.options("*", cors()); // enable pre-flight
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(passport.initialize());


// Configure DB connection
// Note: Backend may be vulnerable to SQL Injection
// TODO: DB credentials needs to be passed as app settings or env var during deployment
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "LaptopTracker",
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("MySQL db connected");
  }
});


// Middleware
// Configure LocalStrategy for username + password login
const localStrategy = new LocalStrategy(function verify(username, password, done) {
  db.query("SELECT * FROM users WHERE username = ?", [username], function(err, row) {
    if (err) { return done(err); }
    if (!row || row.length == 0) { return done(null, false); };

    var user = row[0];

    crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

// Configure JWTStrategy for JWT auth on requests after login
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const jwtStrategy = new JwtStrategy(opts, (token, done) => {
  try {
    db.query("SELECT * FROM users WHERE id = ?", [token.id], function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authLocal = passport.authenticate("local", { session: false });
const authJwt = passport.authenticate("jwt", { session: false });


// Authentication Utils
createToken = (user) => {
  return jwt.sign(
    {
      iss: "Bold Idea Laptop Tracker API",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1200, // 20 min expiry
      id: user.id,
      role: user.role
    },
    JWT_SECRET
  );
}

createJwt = (user) => {
  return {
    id: user.id,
    username: user.username,
    token: createToken(user)
  }
}

const isAdmin = async (req, res, next) => {
  var userRole = req.user[0].role;
  if (userRole === ROLES.USER) {
    return res.status(401).send();
  }
  next();
}


// Utils 
function createLaptopBody(req) {
  return {
    serial_number: req.body.serial_number,
    manufacturer: req.body.manufacturer,
    laptop_id: req.body.laptop_id,
    status: req.body.status,
    donated_by: req.body.donated_by,
    date_donated: req.body.date_donated,
    model: req.body.model,
    screen_size: req.body.screen_size,
    cpu_type: req.body.cpu_type,
    memory: req.body.memory,
    disk_size: req.body.disk_size,
    laptop_condition: req.body.laptop_condition,
    charger_type: req.body.charger_type,
    charger_included: req.body.charger_included,
    trade_in_value: parseFloat(req.body.trade_in_value),
    list_price: parseFloat(req.body.list_price),
    sold_price: parseFloat(req.body.sold_price),
    notes: req.body.notes,
    last_edited: new Date(),
    archived_date: req.body.archived_date ?? null
  }
}


// API Endpoints
// Login using username + password
app.post("/login", authLocal, (req, res, next) => {
  var token = createJwt(req.user);
  res.status(200).send(token);
  return next();
});

// Create new user 
app.post("/users", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const salt = crypto.randomBytes(16);

  if (typeof username !== "string" || typeof password !== "string" || typeof firstName !== "string" || typeof lastName !== "string") {
    res.status(400).send(ERRORS.INVALID_PARAMETERS);
    return;
  }
  if (!ALPHANUMERIC_REGEX.test(firstName) || !ALPHANUMERIC_REGEX.test(lastName)) { 
    res.status(400).send(ERRORS.ALPHANUMERIC_ONLY);
    return;
  }
  if (!PASSWORD_REGEX.test(password)) { 
    res.status(400).send(ERRORS.PASSWORD_COMPLEXITY);
    return;
  }

  crypto.pbkdf2(password, salt, 310000, 32, "sha256", function(err, hashedPassword) {
    if (err) { return cb(err); }
    db.query(
      "INSERT INTO users (firstName, lastName, username, password, salt, role) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, username, hashedPassword, salt, ROLES.USER],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            res.status(409).send(ERRORS.USER_EXISTS);
          } else {
            next(err);
          };
        } else {
          res.status(201).send();
        }
      }
    );
  }); 
});

// Get all users 
app.get("/users", authJwt, isAdmin, (req, res, next) => {
  let query = "SELECT id, firstName, lastName, username, role FROM users";

  db.query(query, (err, results) => { 
    if (err) next(err);
    res.send(results);
  });
});

// Update user role or password
app.put("/users/:id", authJwt, (req, res, next) => {
  const id = parseInt(req.params.id);
  const role = req.body.role;
  const requestUserId = parseInt(req.user[0].id);

  if (typeof id !== "number") {
    res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  if (req.body.password) { 
    // Password changes only allowed on self or on others by admin
    if (requestUserId === id || 
      req.user[0].role === ROLES.ADMIN || 
      req.user[0].role === ROLES.SUPERADMIN) 
    { 
      const password = req.body.password;
      const salt = crypto.randomBytes(16);

      if (typeof password !== "string") { 
        res.status(400).send(ERRORS.INVALID_PARAMETERS);
      }
      if (!PASSWORD_REGEX.test(password)) { 
        res.status(400).send(ERRORS.PASSWORD_COMPLEXITY);
      }

      crypto.pbkdf2(password, salt, 310000, 32, "sha256", function(err, hashedPassword) {
        if (err) { return cb(err); }
        let query = "UPDATE users SET password = ?, salt = ? WHERE id = ?";
        db.query(query, [hashedPassword, salt, id], (err, result) => {
          if (err) next(err);
          res.send();
        });
      });
    } else { 
      res.status(401).send();
    }
  } else { 
    if (req.user[0].role === ROLES.ADMIN || req.user[0].role === ROLES.SUPERADMIN) {
      
      // Do not allow role changes to self
      if (requestUserId === id) { 
        res.status(400).send(ERRORS.USER_CHANGES_FAIL);
      }
      if (typeof role !== "string") { 
        res.status(400).send(ERRORS.INVALID_PARAMETERS);
      }
      if (!ALPHANUMERIC_REGEX.test(role)) { 
        res.status(400).send(ERRORS.INVALID_PARAMETERS);
      }

      let query = "UPDATE users SET role = ? WHERE id = ?";
      db.query(query, [role, id], (err, result) => {
        if (err) next(err);
        res.send();
      });
    } else {
      res.status(401).send();
    }
  }
});

// Delete user
app.delete("/users/:id", authJwt, isAdmin, (req, res, next) => {
  const id = parseInt(req.params.id);

  if (typeof id !== "number") {
    res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) next(err);
    res.send();
  })
});

// Get all laptops
app.get("/inventory", authJwt, (req, res) => {
  let sqlQuery = "SELECT * FROM laptops";

  db.query(sqlQuery, (err, results) => {
    if (err) next(err);
    res.send(results);
  });
});

// Get laptop by Id
app.get("/inventory/:id", authJwt, (req, res) => {
  const id = parseInt(req.params.id);

  if (typeof id !== "number") { 
    res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let sqlQuery = "SELECT * FROM laptops WHERE id = ? LIMIT 1";

  db.query(sqlQuery, [id], (err, results) => {
    if (err) return next(err)

    if (results.length === 0) {
      return res.status(404).send("Laptop with serial number", id, "not found.");
    }
    return res.send(results[0]);    
  });
});

// Add a new laptop 
// TODO: Consider adding type checks once laptop class is better defined
app.post("/add", authJwt, (req, res, next) => {
  let sqlQuery = "INSERT INTO laptops SET ?";
  let laptop = createLaptopBody(req);
  db.query(sqlQuery, laptop, (err, results) => {
    if (err) {next(err)}
    else return res.status(201).send();
  });
});

// Update laptop by Id
app.put("/edit/:id", authJwt, (req, res, next) => {
  const id = parseInt(req.params.id); 
  let laptop = createLaptopBody(req);

  if (typeof id !== "number") {
    return res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let sqlQuery = "UPDATE laptops SET ? WHERE id = ?";
  db.query(sqlQuery,[laptop, id], (err, results) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      return res.status(204).send(results);
    }
  });
});

// Get dropdown options
// TODO: Consider adding regex to check dropdown and option values
app.get("/:dropdown", authJwt, (req, res) => {
  const dropdown = req.params.dropdown;

  if (typeof dropdown !== "string") { 
    return res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let sql = "SELECT * FROM ??";
  let sqlQuery = mysql.format(sql, [dropdown]);

  db.query(sqlQuery, (err, results) => {
    if (err) next(err)
    return res.send(results);
  });
});

// Add dropdown option 
app.put("/:dropdown/:option", authJwt, (req, res, next) => {    
  const dropdown = req.params.dropdown;
  const option = req.params.option;

  if (typeof dropdown !== "string" || typeof option !== "string") { 
    res.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let sqlQuery = `INSERT INTO ${dropdown}(options) VALUES (?)`;

  db.query(sqlQuery, [option], (err, results) => {
    if (err) next(err)
    else res.status(204).send(results);
  });
});

// Delete dropdown option
app.delete("/:dropdown/:option", authJwt, (req, res, next) => {    
  const dropdown = req.params.dropdown;
  const option = req.params.option; 

  if (typeof dropdown !== "string" || typeof option !== "string") {
    req.status(400).send(ERRORS.INVALID_PARAMETERS);
  }

  let sqlQuery = `DELETE FROM ${dropdown} WHERE options = ?`;

  db.query(sqlQuery, [option], (err, results) => {
    if (err) next(err)
    else res.status(204).send(results);
  });
});

 
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Something went wrong. Please try again later");
});
