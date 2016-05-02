var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, index: true },
  orderName: {type: String},
  billAmount: { type: Number, default: 0 },
  orderType: {type: String},
  paymentType: {type: String},
  deliveryType: {type: String},
  paid: { type: Boolean, default: false }
});
// Orders collection is created and each time we save new object or row is created
module.exports = mongoose.model('Orders', orderSchema);