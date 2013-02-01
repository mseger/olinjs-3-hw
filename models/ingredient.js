var mongoose = require('mongoose'), Schema = mongoose.Schema

var ingredientSchema = new Schema({
	name: String, 
	cost: Number
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;