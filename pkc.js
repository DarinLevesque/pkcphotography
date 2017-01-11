var compression = require('compression');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fortune = require('./lib/fortune.js');

// *** routes *** //
var routes = require('./routes/index.js');

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(compression());

// Helmet

var helmet = require('helmet');
app.use(helmet());

// Bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Assign Port
app.set('port', process.env.PORT || 3000);


// remove header venurability
app.disable('x-powered-by');

// set static folder
app.use(express.static(__dirname + '/public'));

// ignore tests in production
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

switch(app.get('env')){
 case 'development':
 // compact, colorful dev logging
 app.use(require('morgan')('dev'));
 break;
 case 'production':
 // module 'express-logger' supports daily log rotation
 app.use(require('express-logger')({
 path: __dirname + '/log/requests.log'
 }));
 break;
}

// routes go here....
app.use('/', routes);
// app.get('/', function(req, res) {
//     res.render('comingsoon', { layout: null });
// });


// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// start node server
app.listen(app.get('port'), function() {
    console.log('Express started in ' + app.get('env') +
 ' mode on http://localhost:' + app.get('port') +
 '; press Ctrl-C to terminate.');
});