const express = require('express');

const laptopsController = require('../controllers/laptops-controllers');

const router = express.Router();

router.get('/', laptopsController.getAllLaptops);

router.post('/', laptopsController.createLaptop); //does not need any changes to the route

module.exports = router;