const express = require('express');
const router = express.Router();

const path = '../views/links/auth'

const passport =  require('passport');
 
 router.get('/signup',(req, res) => {
    let pathSignup = path +'/signup.hbs';
    res.render(pathSignup);  
 });

 router.post('/signup', passport.authenticate('local.signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
   }));


//sign in
   router.get('/signin',(req,res)=>{
      res.render('auth/signin');
   });   

   router.post('/signin', (req, res,next )=>{
      passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
      })(req,res,next)
   });

   router.get('/profile',(req,res)=>{
      res.send('this is your prfiel')
   });
 
module.exports = router; 