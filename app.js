var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file');
var goodsRouter = require('./routes/goods');
var OrderRouter = require('./routes/order');
var jtw = require('./common/jsonWebToken')
var app = express();

// 1、引入express的路由模块
// var router = express.Router();
// router.all("*", (req, res, next) => {
//   let host = req.headers.host;
//   host = host.replace(/\:\d+$/, ''); // Remove port number
//   res.redirect(307, `https://${host}${req.path}`);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(jtw.checkToken)
app.use('/file',fileRouter)
app.use('/goods',goodsRouter)
app.use('/order',OrderRouter)

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
