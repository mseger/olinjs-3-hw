
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , ingredient = require('./routes/ingredient')
  , order = require('./routes/order')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// GETS
app.get('/', ingredient.list);
app.get('/users', user.list);
app.get('/ingredient', ingredient.list);
app.get('/ingredient/new', ingredient.create);
app.get('/ingredient/delete_all', ingredient.delete_all);
app.get('/orders', order.list);
app.get('/order/new', order.create);

// POSTS
app.post('/ingredient/new', ingredient.create_post);
app.post('/order/new', order.create_post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
