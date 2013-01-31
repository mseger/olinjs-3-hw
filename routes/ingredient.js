var Ingredient = require('../models/ingredient')

// show all ingredients
exports.list = function(req, res){
	// get the list of ingredients
	var ingredients = Ingredient.find({}).exec(function (err, docs){
		if (err)
			return console.log("Not able to procure your ingredients.");
		// if everything's in order, return the list of ingredients
		res.render('ingredient', {ingredients: docs, title: 'Current working ingredient list'});
	});
};

// GET: create a new ingredient 
exports.create = function(req, res){
	// render a form for user to enter ingredient input
	res.render('add_ingredient', {title: 'Add another ingredient!'});
};

// POST: create a new ingredient
exports.create_post = function(req, res){
	// post action for the newly-created ingredient

	// save form info into ingredient entry in database
	var newIngredient = new Ingredient({name: req.body.name, cost: req.body.cost});
	newIngredient.save(function (err) {
		if (err)
			console.log("Couldn't save your new ingredient.");
		// otherwise,saving to db worked, redirect to list of ingredients
		res.redirect('/ingredient');
	});
};

exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	Ingredient.remove({}, function(err) { 
   		console.log('collection removed');
   		res.redirect('/ingredient');
	});
};
