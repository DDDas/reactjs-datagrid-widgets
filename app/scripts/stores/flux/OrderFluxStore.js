import find from 'lodash/collection/find';
import dispatcher from '../../dispatchers/AppDispatcher';
import Actions from '../../actions/flux/OrderFluxActions';
import OrderXhrService from '../../xhrService/OrderXhrService';
import Store from './Store';

class OrderFluxStore extends Store {

    constructor() {
        super('OrderFluxStore');
        this.logger.debug('Initializing OrderFluxStore');
        this.setState('route', 'orderInformation');
        this.setState('order', {
            orderId : '',
            orderName : '',
            orderType : '',
            deliveryType : ''
        });
        this.setState('payment', {
            paymentType : '',
            billAmount : ''
        });
    }

    onAction(actionType, data) {
        this.logger.debug(`Received Action ${actionType} with data`, data);
        switch (actionType) {

            case 'NAVIGATE':
                let newRoute = data.location;
                if (newRoute !== this.get('route')) {
                    this.set('route', newRoute);
                }
                break;
            case 'SAVE_ORDER_DATA':
                OrderXhrService.saveOrder(data).then(
                    () => {
                        this.logger.debug('Order Saved. ');
                    },
                    (err) => {
                        this.logger.debug('There was a problem saving the order - '+ err);
                    }
                )
                break;


            default:
                this.logger.debug('Unknown actionType for this store - ignoring');
                break;
        }
    }

}

var orderFluxStore = new OrderFluxStore();
dispatcher.registerStore(orderFluxStore);

export default orderFluxStore;
