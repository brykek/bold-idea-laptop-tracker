const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'LaptopTracker'
});

con.connect((err) => {
    if(err) throw err;
    console.log("MySQL db connected");
})

app.get('/inventory', (req, res) => {
    let sqlQuery = "SELECT * FROM laptops";

    let query = con.query(sqlQuery, (err, results) => {
        if(err) throw err;
        res.send(apiResponse(results));
    })
})

function apiResponse(results) {
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3001, () => {
    console.log("Server running on port 3001");
})