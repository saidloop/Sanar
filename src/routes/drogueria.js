const express = require('express');
const router = express.Router();
const pool = require('../database')
const multer = require("multer");
const upload = multer({ dest: "./src/public/imgProductos" });
const path = require("path");
const fs = require("fs");

router.get('/productos' , async (req, res) => {
    const productos = await pool.query('SELECT * FROM producto');
    console.log("Los productos: "+ productos)
    res.render('links/productos',{productos});
});

router.get('/list' , async (req, res) => {
    const productos = await pool.query('SELECT * FROM producto');
    console.log("Los productos: "+ productos)
    res.render('links/list',{productos});
});

router.get('/productos/:id', async (req, res)=>{
    const {id} = req.params;
    const productos = await pool.query('SELECT * FROM producto WHERE id IN (SELECT producto_id FROM adquier WHERE drogueria_id = ?)', [id]);
    console.log(productos);
    res.render('links/productos',{productos});
});

router.post('/subir/:id', upload.single('imagen'), async (req,res)=>{
    res.redirect("/perfil");
  })

router.post('/addProduct', upload.single("imagen"),async (req, res)=>{
    const { nombre, descripcion, precio, unidades, drogueria_id, imagen} = req.body;
    const nose = fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    const ola = "." + req.file.mimetype.split('/')[1];
    const source = req.file.filename + ola
    console.log(source);
    const new_producto = {
        nombre,
        descripcion,
        precio,
        unidades,
        drogueria_id,
        source
    };
    console.log(new_producto)
    await pool.query('INSERT INTO producto set ?', [new_producto]);   
    req.flash('message', 'PRODUCTO GUARDAO MI PEZ');  
    res.redirect('/productos');
});

//eliminar productos
router.get('/delete/:id' , async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM producto WHERE id = ?', [id]);
    req.flash('success', 'PRODUCTO eliminao MI PEZ');
    res.redirect('/list');
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
      const { nombre, descripcion, precio, drogueria_id, unidades, laboratorio, tamanio, presentacion } = req.body;
      const new_producto = {
         nombre, 
         descripcion, 
         precio, 
         drogueria_id, 
         unidades,
         laboratorio,
         tamanio,
        presentacion
      };
      await pool.query('UPDATE producto SET ? WHERE id = ?', [new_producto, id]);
      req.flash('success', 'PRODUCTO editAO MI PEZ');
      res.redirect('/productos')
 });

 module.exports = router;