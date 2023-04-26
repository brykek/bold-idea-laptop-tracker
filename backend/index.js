const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');

// Add cors
const cors = require('cors');
app.use(cors());
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json())
app.use(express.json());

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Pariveda1!',
    database: 'LaptopTracker'
});

con.connect((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log("MySQL db connected");
    }
})

app.post('/signup', (req, res) => {
    const username = app.body.username
    const password = app.body.password

    db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, password], (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req, res) => {
    const username = app.body.username
    const password = app.body.password

    db.query( "SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err){
            res.send({err:err})
        } 
        if (result) {
            res.send(result)
        } else {
            res.send({message: "Wrong username/password."})
        }  
    })
})

// Get all laptops
app.get('/inventory', (req, res) => {
    let sqlQuery = "SELECT * FROM laptops";

    let query = con.query(sqlQuery, (err, results) => {
        if(err) throw err;
        res.send(apiResponse(results));
    })
})

// Create laptop
app.post('/add', (req, res) => {
    let data = {
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
        created_date:  req.body.created_date,
        last_edited: req.body.created_date,
        archived_date: null
    };
    
    let sqlQuery = "INSERT INTO laptops SET ?";

    let query = con.query(sqlQuery, data,(err, results) => {
        if(err) throw err;
        res.send(apiResponse(results));
    });
});

// Updates laptop
app.put('/edit/laptop/:serial_number', (req, res) => {
    let sqlQuery = "UPDATE laptops SET serial_number='"+req.body.serial_number+
    "', manufacturer="+req.body.manufacturer+
    "', laptop_id="+req.body.laptop_id+
    "', status="+req.body.status+
    "', donor="+req.body.donor+
    "', date_donated="+req.body.date_donated+
    "', model="+req.body.model+
    "', screen_size="+req.body.screen_size+
    "', cpu_type="+req.body.cpu_type+
    "', memory="+req.body.memory+
    "', disk_size="+req.body.disk_size+
    "', laptop_condition="+req.body.laptop_condition+
    "', charger_type="+req.body.charger_type+
    "', charger_included="+req.body.charger_included+
    "', trade_in_value="+req.body.trade_in_value+
    "', list_price="+req.body.list_price+
    "', sold_price="+req.body.sold_price+
    "', notes="+req.body.notes+
    "', last_edited="+req.body.last_edited+
    "', archived_date="+req.body.archived_date;

    let query = con.query(sqlQuery, (err, results) => {
        if(err) throw err;
        res.send(apiResponse(results));
    });
})

// formats API response
function apiResponse(results) {
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3001, () => {
    console.log("Server running on port 3001");
});