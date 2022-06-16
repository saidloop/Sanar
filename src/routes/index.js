const express = require('express');
const router = express.Router();
const pool = require('../database')

//Raiz
router.get("/index", async (req, res) => {
    res.render("links/index");
  });

module.exports = router;

//Agregar 
router.get('/add',(req, res)=>{
  res.render('links/add');

})

router.get('/ubicacion',(req, res)=>{
  res.render('links/ubicacion'); 
})




