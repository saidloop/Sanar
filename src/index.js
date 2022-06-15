const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mySQLstore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys');

//inicializacion 
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultlayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');


//middlewars
app.use(session({
    secret: 'seeker',
    resave: false,
    saveUninitialized: false,
    store:new mySQLstore (database)
})); 
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session()); 

//global variables 
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.drogueria= req.drogueria;
    next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/index'));
app.use('/',require('./routes/drogueria'))



//public
app.use(express.static(path.join(__dirname ,'/public')))


//start server
app.listen(app.get('port'), () => {
    console.log('http://localhost:3000/links/index', app.get('port'));
});
