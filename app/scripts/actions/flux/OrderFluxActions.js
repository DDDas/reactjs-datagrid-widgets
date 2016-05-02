import dispatcher from '../../dispatchers/AppDispatcher';

export default class OrderFluxActions {
    static navigate(newRoute) {
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }

    static validateAndGoNextPane(data, direction) {
    	var validationResponse = null;
    	//implement validation rule

    	if(validationResponse)
    	{
    		
    	}else{
    		let newRoute = OrderFluxActions.determineTarget(data.route, direction);
    		dispatcher.dispatch('NAVIGATE', { location: newRoute });
    	}        
    }

    static goPrevPane(data, direction) {
		let newRoute = OrderFluxActions.determineTarget(data.route, direction);
		dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }
//  Move to Business Logic Area
    static determineTarget(route, direction) {
    	var target = route;
    	if(direction === 'next')
    	{
    		switch (route) {
	            case 'orderInformation': target = 'paymentInformation'; break;
	            case 'paymentInformation': target = 'orderConfirmation'; break;
	            default: target = route;
	        }
    	}
    	if(direction === 'prev')
    	{
    		switch (route) {
	            case 'paymentInformation': target = 'orderInformation'; break;
	            case 'orderConfirmation': target = 'paymentInformation'; break;
	            default: target = route;
	        }
    	}
        return target;
    }

    static saveOrder(order) {
        dispatcher.dispatch('SAVE_ORDER_DATA', { data: order });
    }
}
