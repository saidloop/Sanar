const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//SING IN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log(req.body)
    pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        await helpers.matchPassword(password,user.password);
        if (validPassword){
            done(null, user, req.flash('success' ,'Welcome' + user.email));
        } else {
            done(null, false, req.flash('messages','Incorrect Password'));
        }

    } else {
        return done (null, false, req.flash('messages','no existe'));
    }
}));

//SIGNUP 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email,password, done) => {
const {nombre} = req.body;
const newUser = {
    email,
    password,
    nombre
}; 
newUser.password = await helpers.encryptPassword(password);
const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
newUser.id = result.insertid;
return done(null, newUser);
}));

passport.serializeUser((user, done) =>{
    done(null, user.id)
});

passport.deserialize( async (id, done) =>{
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, rows[0]);
});