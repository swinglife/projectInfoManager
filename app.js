var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect')
var session = require('express-session')



var routes = require('./routes/index');
var users = require('./routes/users');
var project = require('./routes/project');
var group = require('./routes/group');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(connect.session({
//  secret:'keyboard cat',
//  cookie:{maxAge:60000}  
//}));
console.log(connect)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret:'imooc',
  key:'sid',
  resave:true,
  saveUninitialized:true  
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  var url = req.originalUrl;
  console.log("session::::"+req.session.type);
  if(url=='/users/toLogin'||url=='/users/login'){
    next();
  }else if(req.session.email!=undefined){
    next();
  }else{
    res.redirect('/users/toLogin');
  }
})

app.use(function(req, res, next){
  res.locals.type = req.session.type;
  next();
});

app.use('/project',project);
app.use('/', routes);
app.use('/users', users);
app.use('/group', group);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
