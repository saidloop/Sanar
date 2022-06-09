const express = require('express');
const router = express.Router();
const passport = require("passport");
const pool = require('../database');


router.get('/mostrar' , async (req, res) => {
    const productos = await pool.query('SELECT * FROM producto');
    res.render('links/index',{productos});
});

// listar productos en pagina link (cambiar)
router.post('/add', async (req, res)=>{
    const { nombre, descripcion, precio, unidades, drogueria_id} = req.body;
    const new_producto = {
        nombre,
        descripcion,
        precio,
        unidades,
        drogueria_id
    };
    await pool.query('INSERT INTO producto set ?', [new_producto]);   
    req.flash('success', 'PRODUCTO GUARDAO MI PEZ');  
    res.redirect('/links/index');
});

//eliminar productos
router.get('/delete/:id' , async (req, res) => {
   const {id} = req.params;
   await pool.query('DELETE FROM producto WHERE id = ?', [id]);
   req.flash('success', 'PRODUCTO eliminao MI PEZ');
   res.redirect('/links');
});

//editar productos
router.get('/edit/:id' , async (req, res) => {
    const {id} = req.params;
    const producto = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);
    console.log(producto[0]);
    res.render ('links/edit',{producto: producto[0]});
 });

 router.post('/edit/:id', async (req, res) => {
     const {id} = req.params;
     const { nombre, descripcion, precio, drogueria_id, unidades } = req.body;
     const new_producto = {
        nombre, 
        descripcion, 
        precio, 
        drogueria_id, 
        unidades
     };
     await pool.query('UPDATE producto SET ? WHERE id = ?', [new_producto, id]);
     req.flash('success', 'PRODUCTO editAO MI PEZ');
     res.redirect('/links')
});

module.exports = router;

