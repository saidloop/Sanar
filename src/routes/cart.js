const express = require('express');
const router = express.Router();
const pool = require('../database')


 /*Admin mode */

router.get('/cart' , async (req, res) => {
   res.render('links/cart');
});

/*Opciones de carrito*/
router.post('/AddToCart' , async (req, res) => {
    
 });
router.post('/DelToCart' , async (req, res) => {
    
});

module.exports = router;