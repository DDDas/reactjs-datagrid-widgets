'use strict'

require('babel-register');

var OrderService = require('./order.service'); 

module.exports = class OrderResource {
	 constructor() {
	    this.configure = this.configure.bind(this);
	 }
		
	 configure(server){
//GET
	 	server.get('/orders/:id', function(req, res){
	    	let service = new OrderService();
	    	console.log('Inside Get Order By Id ');
	    	service.getOrderById(req, res);
	    });
//GET
		server.get('/orders', function(req, res){
	    	let service = new OrderService();
	    	console.log('Inside Get Orders ');
	    	service.getOrders(req, res);
	    });
//POST
	    server.post('/orders', function(req, res){
	    	let service = new OrderService();
	    	console.log('Inside Get Filtered Orders ');
	    	service.getFilteredOrders(req, res);
	    });	    
//POST
	    server.post('/orders/save', function(req, res){
	    	let service = new OrderService();
	    	console.log('Inside Save Orders ');
	    	service.saveOrder(req, res);
	    });
	 }
} 