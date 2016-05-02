'use strict'

var Order = require('./order.schema'); 
// NodeJS does not support import/export till now
module.exports = class OrderService {
    constructor() {
    	// Bind the functions to class
        this.saveOrder = this.saveOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
    }

	saveOrder(req, res){
		var newOrder = new Order({
	              orderId: req.body.orderId,
	              orderName: req.body.orderName,
	              billAmount: req.body.billAmount,
	              orderType: req.body.orderType,
	              paymentType: req.body.paymentType,
	              deliveryType: req.body.deliveryType,
	              paid: true
	            });
			newOrder.save(function(err) {
	        if (err) return next(err);
	        res.send({ message: ' Order has been added successfully!' });
	    });
	}

	getOrders(req, res){
	    Order
        .find()
        .select('orderId orderName billAmount orderType paymentType deliveryType') 
        .exec(function(err, orders) {
          if (err) return next(err);
          if(!orders){
          	return res.status(404).send({ message: 'No Orders Found.' });
          }
          res.send(orders);
        });
	}

	getOrderById(req, res){
	    var id = req.params.id;

		  Order.findOne({ orderId: id }, function(err, order) {
		    if (err) return next(err);

		    if (!order) {
		      return res.status(404).send({ message: 'Order not found.' });
		    }

		    res.send(order);
		  });
	}

	getFilteredOrders(req, res){
		var conditions = {};
		if(req.body.paymentType)
		{
			conditions["paymentType"] = req.body.paymentType;
		}
		if(req.body.orderType)
		{
			conditions["orderType"] = req.body.orderType;
		}
	    Order
	    .find(conditions)
	    .limit(100)
	    .select('orderId orderName billAmount orderType paymentType deliveryType') 
	    .exec(function(err, orders) {
	      if (err) return next(err);
          if(!orders){
          	return res.status(404).send({ message: 'No Orders Found.' });
          }
          res.send(orders);
	    });
	}

} 