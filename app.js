
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , ingredient = require('./routes/ingredient')
  , order = require('./routes/order')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

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
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

// GETS
app.get('/', ingredient.list);
app.get('/users', user.list);
app.get('/ingredient', ingredient.list);
app.get('/ingredient/new', ingredient.create);
app.get('/ingredient/delete_all', ingredient.delete_all);
app.get('/orders', order.list);
app.get('/order/new', order.create);
app.get('/orders/delete_all', order.delete_all);

// POSTS
app.post('/ingredient/new', ingredient.create_post);
app.post('/order/new', order.create_post);
app.post('/orders/delete/:id', order.index_delete); // only reached when you click on an "order completed" button

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
