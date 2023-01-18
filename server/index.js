const express = require('express');
const bodyParser = require('body-parser');

const laptopsRoutes = require('../routes/laptops-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/laptops', laptopsRoutes);

app.listen(5000);