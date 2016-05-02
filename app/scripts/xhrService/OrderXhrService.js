export default class OrderXhrService {
    static saveOrder(order) {
    	debugger;
        return new Promise((resolve, reject) => { 
        	$.ajax({
		      type: 'POST',
		      url: 'http://localhost:4730/orders/save',
		      data: order.data
		    }).done((result) => {              
				resolve(result.data);
			}).fail((err) => {
		        reject(err);
		    })
	});
    }
}
