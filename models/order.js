var mongoose = require('mongoose'), Schema = mongoose.Schema 

var orderSchema = new Schema({
	customerName: String, 
	ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;