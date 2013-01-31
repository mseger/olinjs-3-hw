var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var ingredientSchema = mongoose.Schema({
	name: String, 
	cost: Number
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;