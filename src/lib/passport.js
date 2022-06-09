const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../database");
const helpers = require('../lib/helpers');

//SING IN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    
}, async (req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE email = ?', email);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password , user.password );
        console.log(validPassword)
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido' + user.email));
        } else {
            done(null, false, req.flash('message', 'Correo o contrasena incorrectas'));
        }

    } else {
        return done(null, false, req.flash('message', 'No existe'));
    }
}));

//SIGNUP 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log(req.body);
    const { nombre } = req.body;
    const newUser = {
        nombre,
        email,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO usuarios SET ?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("SELECT * FROM usuarios where id = ?", [id]);
    done(null, rows[0]);
});