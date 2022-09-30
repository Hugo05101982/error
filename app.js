var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var novedadesRouter = require('./routes/novedades');
var nosotrosRouter = require('./routes/nosotros');
require("dotenv").config();
var LoginRouter = require('./routes/admin/login');
var app = express();
var adminRouter = require("./routes/admin/novedades");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/novedades', novedadesRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/admin/login', LoginRouter);
app.use('/admin/novedades', adminRouter);

app.use(session({
secret: '4c193eb3ec2ce5f02b29eba38621bea1',
resave: false,
saveUninitialized: true
}))


secure = async (req, res, next) => {
try {
  console.log(req.session_id_usuario);
  if (req.session_id_usuario) {
    next();
  } else {
    res.redirect('admin/login')
}
} catch (error) {
  console.log(error);
}
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/novedades', function(req,res){
  res.send('hola soy la pagina de prueba')
  })
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
