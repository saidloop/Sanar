const express = require('express');
const router = express.Router();

//Raiz
router.get("/index", async (req, res) => {
    res.render("links/index");
  });

module.exports = router;

//Agregar 
router.get('/add',(req, res)=>{
  res.render('/links/add'); 
})

router.get('/si',(req, res)=>{
  res.render('/links/si'); 
})



