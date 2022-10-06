const express = require('express');
const app = express();
//const mysql = require('mysql');
//const cors = require("cors");

//app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'LaptopTracker'
// });

// POST to create an entry in the table
// export function createLaptop(laptopData) {
//     app.post('/add', (req, res) => {
//         const serialNumber = req.body.serialNumber;
//         const manufacturer = req.body.manufacturer;
//         const laptopId = req.body.laptopId;
//         const status = req.body.status;
//         const donor = req.body.donor;
//         const dateDonated = req.body.dateDonated;
//         const model = req.body.model;
//         const screenSize = req.body.screenSize;
//         const cpuType = req.body.cpuType;
//         const memory = req.body.memory;
//         const diskSize = req.body.diskSize;
//         const condition = req.body.condition;
//         const chargerType = req.body.chargerType;
//         const chargerIncluded = req.body.chargerIncluded;
//         const tradeInValue = req.body.tradeInValue;
//         const listPrice = req.body.listPrice;
//         const soldPrice = req.body.soldPrice;
//         const notes = req.body.notes;
//         const createdDate = req.body.createdDate;
//         const lastEdited = req.body.lastEdited;
//         const archivedDate = req.body.archivedDate;
    
//         db.query(
//             "INSERT INTO laptops (serial_number, maufacturer, laptop_id, status, donor, date_donated, model, screen_size, cpu_type, memory, disk_size, condition, charger_type, charger_included, trade_in_value, list_price, sold_price, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [serialNumber, manufacturer, laptopId, status, donor, dateDonated, model, screenSize, cpuType, memory, diskSize, condition, chargerType, chargerIncluded, tradeInValue, listPrice, soldPrice, notes, createdDate, lastEdited, archivedDate],
//             (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     res.send("Values inserted");
//                 }
//             }
//         );
//     });
// }


// GET all laptops in inventory that are not Archived
app.get("/", (req, res) => {
    // const query = "SELECT * FROM laptops WHERE NOT status='Archived'";
    // db.query(query, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.send(result);
    //     }
    // })
    // return res.send("GET request recieved");
    res.json({message: "Express is working"});
});

// app.put('/update', (req, res) => {
//     return res.send("UPDATE request recieved");
// });

app.listen(3001, () => {
    console.log("Server is running on port 3001!")
});
