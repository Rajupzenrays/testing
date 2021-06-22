var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var trainingRouter = require('./routes/training');
var hobbyRouter = require('./routes/hobby')
var sessionRouter = require('./routes/sessions')

var app = express();

// for session
app.use(
  session({
    secret:"session_secret_key",
    resave: true,
    saveUnitialized: true,
  })
  )
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);
app.use('/training', trainingRouter);
app.use('/hobby', hobbyRouter);
app.use('/sessions', sessionRouter)



var mongoose = require('mongoose');
var mongoConnUrl = 'mongodb://localhost/zenrays';

//this is the url 
mongoose.connect(mongoConnUrl,{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', function(){
  console.log('error came in connecting');
});

// link swagger to our url
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/myswagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
