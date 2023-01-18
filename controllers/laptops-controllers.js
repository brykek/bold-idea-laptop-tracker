const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'sys'
});

const getAllLaptops = (req, res, next) => {
    res.send(req.body);
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM laptops", function(err, result){
            if (err) throw err;
            console.log("Got all laptops");
        })
    })
};

const createLaptop = async (req, res, next) => {
    console.log(req.body);
    const serialNumber = req.body.serialNumber;
    const manufacturer = req.body.manufacturer;
    const laptop_four_char = req.body.laptopId;
    const status = req.body.status;
    const donor = req.body.donor;
    const dateDonated = req.body.dateDonated;
    const model = req.body.model;
    const screenSize = req.body.screenSize;
    const cpuType = req.body.cpuType;
    const memory =req.body.memory;
    const diskSize = req.body.diskSize;
    const condition = req.body.condition;
    const chargerType = req.body.chargerType;
    const chargerIncluded = req.body.chargerIncluded;
    const tradeInValue = req.body.tradeInValue;
    const listPrice = req.body.listPrice;
    const soldPrice = req.body.soldPrice;
    const notes = req.body.notes;
    const createdDate = req.body.createdDate;
    const lastUpdated = req.body.lastUpdated;
    const archivedDate = req.body.archivedDate;



    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const sql = `INSERT INTO laptops (
            serial_Number,
            manufacturer,
            laptop_four_char,
            status,
            donor,
            date_donated,
            model,
            screen_size,
            cpu_type,
            memory,
            disk_size,
            condition,
            charger_type,
            charger_included,
            trade_in_value,
            list_price,
            sold_price,
            notes,
            created_date,
            last_updated,
            archived_date
         ) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        con.quert(sql, (serialNumber, manufacturer, laptop_four_char, status, donor, dateDonated, model, screenSize, cpuType, memory, diskSize, condition,
            chargerType, chargerIncluded, tradeInValue, listPrice, soldPrice, notes, createdDate, lastUpdated, archivedDate), function(err, result) {
            if (err) throw err;
            console.log("Laptop created!")
        });
    });
};

module.exports = { getAllLaptops, createLaptop };