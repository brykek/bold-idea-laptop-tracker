const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');
const { dblClick } = require("@testing-library/user-event/dist/click");

app.use(bodyParser.json())
app.use(express.json());
app.use(cors);

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '[redacted]',
    database: 'LaptopTracker'
});

con.connect((err) => {
    if (err) {
        console.log(err);
    } 
    console.log("MySQL db connected");
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
    serialNumber: req.body.serialNumber,
    manufacturer: req.body.manufacturer,
    laptopId: req.body.laptopId,
    status: req.body.status,
    donor: req.body.donor,
    dateDonated: req.body.dateDonated,
    model: req.body.model,
    screenSize: req.body.screenSize,
    cpuType: req.body.cpuType,
    memory: req.body.memory,
    diskSize: req.body.diskSize,
    condition: req.body.condition,
    chargerType: req.body.chargerType,
    chargerIncluded: req.body.chargerIncluded,
    tradeInValue: req.body.tradeInValue,
    listPrice: req.body.listPrice,
    soldPrice: req.body.soldPrice,
    notes: req.body.notes,
    createdDate:  req.body.createdDate,
    lastEdited: req.body.createdDate,
    archivedDate: null
    };
    
    let sqlQuery = "INSERT INTO laptops SET ?";

    let query = con.query(sqlQuery, data,(err, results) => {
        if(err) throw err;
        res.send(apiResponse(results));
    });
});

// Updates laptop
app.put('/edit/apple/:serialnumber', (req, res) => {
    let sqlQuery = "UPDATE laptops SET serial_number='"+req.body.serialNumber+
    "', manufacturer="+req.body.manufacturer+
    "', laptop_id="+req.body.laptopId+
    "', status="+req.body.status+
    "', donor="+req.body.donor+
    "', date_donated="+req.body.dateDonated+
    "', model="+req.body.model+
    "', screen_size="+req.body.screenSize+
    "', cpu_type="+req.body.cpuType+
    "', memory="+req.body.memory+
    "', disk_size="+req.body.diskSize+
    "', condition="+req.body.condition+
    "', charger_type="+req.body.chargerType+
    "', charger_included="+req.body.chargerIncluded+
    "', trade_in_value="+req.body.tradeInValue+
    "', list_price="+req.body.listPrice+
    "', sold_price="+req.body.soldPrice+
    "', notes="+req.body.notes+
    "', last_edited="+req.body.lastEdited+
    "', archived_date="+req.body.archivedDate;

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