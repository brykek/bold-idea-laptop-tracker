const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'LaptopTracker'
});

app.post('/create', (req, res) => {
    const serialNumber = req.body.serialNumber;
    const manufacturer = req.body.manufacturer;
    const laptopId = req.body.laptopId;
    const status = req.body.status;
    const donor = req.body.donor;
    const dateDonated = req.body.dateDonated;
    const family = req.body.family;
    const screenSize = req.body.screenSize;
    const cpuType = req.body.cpuType;
    const memory = req.body.memory;
    const diskSize = req.body.diskSize;
    const condition = req.body.condition;
    const chargerType = req.body.chargerType;
    const chargerIncluded = req.body.chargerIncluded;
    const tradeInValue = req.body.tradeInValue;
    const listPrice = req.body.listPrice;
    const soldPrice = req.body.soldPrice;
    const notes = req.body.notes;

    db.query(
        "INSERT INTO laptops (serial_number, maufacturer, laptop_id, status, donor, date_donated, family, screen_size, cpu_type, memory, disk_size, condition, charger_type, charger_included, trade_in_value, list_price, sold_price, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [serialNumber, manufacturer, laptopId, status, donor, dateDonated, family, screenSize, cpuType, memory, diskSize, condition, chargerType, chargerIncluded, tradeInValue, listPrice, soldPrice, notes],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});


app.listen(3001, () => {
    console.log("Server is running!")
});