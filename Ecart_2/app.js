const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session')

const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/templets/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/templets/partials'));
hbs.registerHelper('json', (content) => {
  let cartProduct = JSON.stringify(content);
  return cartProduct;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));


app.use('/admin', adminRoutes);
app.use('/', userRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
