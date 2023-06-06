const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = "Thisisasecret";

const app = express();

// Configure universal app settings 
const cors = require("cors");
app.use(cors());
app.options("*", cors()); // enable pre-flight
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(passport.initialize());

// Configure DB connection
// Note: Backend is vulnerable to SQL Injection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "LaptopTracker",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL db connected");
  }
});

// Configure LocalStrategy for username + password login
const localStrategy = new LocalStrategy(function verify(username, password, done) {
  console.log("Username and Password!");
  db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return done(err); }
    if (!row || row.length == 0) { return done(null, false); };

    var user = row[0];

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
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
    db.query("SELECT * FROM users WHERE id = ?", [ token.id ], function(err, user) {
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

createToken = (user) => {
  return jwt.sign(
    {
      iss: "Bold Idea Laptop Tracker API",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1200, // 20 min expiry
      id: user.id,
      admin: user.isAdmin
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

app.post("/login", authLocal, (req, res, next) => {
  console.log(req);
  var token = createJwt(req.user);
  res.status(200).send(token);
  return next();
});

// Routes
// Create new user 
app.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = crypto.randomBytes(16);

  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }

    db.query(
      "INSERT INTO users (username, password, salt, isAdmin) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, salt, false],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            res.status(409).send("Username already exists");
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

// Get all laptops
app.get("/inventory", (req, res) => {
  let sqlQuery = "SELECT * FROM laptops";

  db.query(sqlQuery, (err, results) => {
    if (err) next(err)
    res.send(results);
  });
});

app.get("/inventory/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM laptops where id = ? limit 1";

  db.query(sqlQuery, [req.params.id], (err, results) => {
    if (err) return next(err)

    if(results.length ===0) return res.status(404).send('Laptop with serial number',req.params.id,'not found')
    
      return res.send(results[0]);    
  });
});

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
    trade_in_value: req.body.trade_in_value,
    list_price: req.body.list_price,
    sold_price: req.body.sold_price,
    notes: req.body.notes,
    last_edited: new Date(),
    archived_date: req.body.archived_date??null,
  }
}

// Create laptop
app.post("/add", (req, res, next) => {
  let sqlQuery = "INSERT INTO laptops SET ?";

  db.query(sqlQuery, createLaptopBody(req), (err, results) => {
    if (err) {next(err)}
    else res.status(201).send();
  });
});

// Updates laptop
app.put("/edit/:id", (req, res, next) => {
    let body = createLaptopBody(req)
    let sqlQuery = "UPDATE laptops SET ? WHERE id=?"
  db.query(sqlQuery,[body,req.params.id], (err, results) => {
    if (err) next(err)
    else res.status(204).send(results);
  });
});

// Get dropdown options
app.get("/:dropdown", (req, res) => {
  let sqlQuery = "SELECT * FROM " + req.params.dropdown;

  db.query(sqlQuery, (err, results) => {
    if (err) next(err)
    res.send(results);
  });
});

// Add dropdown option
app.put("/:dropdown/:option", (req, res, next) => {    
  let sqlQuery = `INSERT INTO ${req.params.dropdown}(options) VALUES (\'${req.params.option}\')`;

  db.query(sqlQuery, (err, results) => {
    if (err) next(err)
    else res.status(204).send(results);
  });
});

// Delete dropdown option
app.delete("/:dropdown/:option", (req, res, next) => {    
  let sqlQuery = `DELETE FROM ${req.params.dropdown} WHERE options = \'${req.params.option}\'`;

  db.query(sqlQuery, (err, results) => {
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
