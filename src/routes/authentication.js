const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth"); 

 //Sign up
 router.get('/signup',(req, res) => {
    res.render('links/auth/signup')
 });


 router.post('/signup', passport.authenticate('local.signup', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
   }));

//Sign in
   router.get('/signin',(req,res)=>{
      res.render('links/auth/signin');
   });   

   router.post('/signin', (req, res,next )=>{
      passport.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
      })(req,res,next)
   });

   //Sign in_admin
   router.get('/admin',(req,res)=>{
      res.render('links/auth/admin');
   });   

   router.post('/admin', (req, res,next )=>{
      console.log(req.body);
      passport.authenticate('local.admin', {
      successRedirect: '/list',
      failureRedirect: '/admin',
      failureFlash: true
      })(req,res,next)
   });

//Profile
router.get('/logout',(req,res)=>{
   req.logOut();
   res.redirect('/signup')
});

//Profile
   router.get('/profile',(req,res)=>{
    res.send('<a class="navbar-brand" href="/"> Drogueria Sanar </a>')
   });
 
module.exports = router; 