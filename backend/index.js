const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Add cors
const cors = require("cors");
app.use(cors());
app.options("*", cors()); // enable pre-flight

app.use(bodyParser.json());
app.use(express.json());

// Note: Backend is vulnerable to SQL Injection

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Pariveda1!",
  database: "LaptopTracker",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL db connected");
  }
});

// Sign up user (should be put?)
app.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO users (username, password, viewOnlyAccess) VALUES (?,?,?)",
    [username, password,false],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).send("Username already exists");
        } else next(err);
      } else {
        res.status(201).send();
      }
    }
  );
});

// Toggle admin flag
app.post("/:username/", (req,res,) => {

});

// Login user
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        next(err);
      } else if (result.length > 0) {
        res.json({username,viewOnlyAccess:result[0].viewOnlyAccess});
      } else {
        res.status(401).send("Wrong username/password.");
      }
    }
  );
});

// Get all laptops
app.get("/inventory", (req, res) => {
  let sqlQuery = "SELECT * FROM laptops";

  db.query(sqlQuery, (err, results) => {
    if (err) next(err)
    res.send(results);
  });
});

// Get all laptops
app.get("/inventory/:serial_number", (req, res) => {
  let sqlQuery = "SELECT * FROM laptops where serial_number = ? limit 1";

  db.query(sqlQuery, [req.params.serial_number], (err, results) => {
    if (err) next(err)
    res.send(results);
  });
});

function createLaptopBody(req){
  return {
    serial_number: req.body.serial_number,
    manufacturer: req.body.manufacturer,
    laptop_id: req.body.laptop_id,
    status: req.body.status,
    donor: req.body.donor,
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
    created_date: new Date(),
    last_edited: new Date(),
    archived_date: req.body.archived_date??null,
  }
}

// Create laptop
app.post("/add", (req, res, next) => {
  let data = createLaptopBody(req);

  let sqlQuery = "INSERT INTO laptops SET ?";

  db.query(sqlQuery, data, (err, results) => {
    if (err) {next(err)}
    else res.status(201).send();
  });
});

// Updates laptop
app.put("/edit/:serial_number", (req, res, next) => {
  let body = createLaptopBody(req);
    
  let sqlQuery = "UPDATE laptops SET ? WHERE serial_number=?";
  db.query(sqlQuery,[body,req.params.serial_number], (err, results) => {
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
