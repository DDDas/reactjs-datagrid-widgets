import alt from '../../dispatchers/alt';
import OrderAppActions from '../../actions/alt/OrderAppActions';

class OrderAppStore {
  constructor() {
    this.bindActions(OrderAppActions);
    this.orders = [];
    this.filters = {};
    this.submitButtonIndicator = false;
    this.order = {};
  }

  updateFilters(filters) {
    this.filters = filters;
  }

  onUpdateOrder(order) {
    this.order = order;
  }

  onUpdateOrderId(event) {
    this.orderId = event.target.value;
  }

  onGetOrdersSuccess(data) {
    this.orders = data;
  }

  onGetOrderSuccess(data) {
    this.order = data;
  }

  onGetOrdersFail(jqXhr) {
    console.info(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(OrderAppStore);