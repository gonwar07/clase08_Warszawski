const express = require('express');
const productsRoutes = require('./products/products.routes');

const router = express.Router();

// Midlewares
router.use(express.json());
router.use(express.urlencoded({extended: true})) //sirve para convertir a objeto información recibida en formato urlencoded

// Routes
router.use('/products', productsRoutes);

module.exports = router;