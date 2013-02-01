var Order = require('../models/order')
var Ingredient = require('../models/ingredient')

// show all orders
exports.list = function(req, res){
	// get the list of cats
	var orders = Order.find({}).populate('ingredients').exec(function (err, docs){
		if(err)
			return console.log("error with grabbing orders", orders);
		// send it back
		res.render('orders', {orders: docs, title: 'Your Order'});
	});
};

// create a new order (GET)
exports.create = function(req, res){
	// render order form 
	var curr_ingredients = Ingredient.find({}).exec(function (err, docs){
		if (err)
			return console.log("no ingredients in pantry to choose from", curr_ingredients);
		res.render('order_form', {ingredients: docs, title: 'Fill out your order'});
	});
};

// create a new order (POST)
exports.create_post = function(req, res){
	// grab info from the form
	var newOrder = new Order({customerName: req.body.name, ingredients: req.body.ingredients});
	
	// save the new order to the db
	newOrder.save(function (err){
		if (err)
			return console.log("Couldn't save your new order");
		// redirect to list of orders
		res.redirect('/orders');
	});
};


// delete all orders in the db
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	Order.remove({}, function(err) { 
   		console.log('collection removed');
   		res.redirect('/orders');
	});
};

// "complete" (ie. delete) a single order by index
exports.index_delete = function(req, res){
	// complete individual orders
	var orders = Order.findOneAndRemove({_id: req.body.id}).exec(function (err, docs){
		if(err)
			return console.log("cannot retrieve orders")
		res.redirect('/orders')
	});
};