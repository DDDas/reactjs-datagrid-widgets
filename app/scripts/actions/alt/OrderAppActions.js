import alt from '../../dispatchers/alt';

class OrderAppActions {
   constructor() {
    this.generateActions(
      'updateFilters',
      'updateOrder',
      'getOrdersSuccess',
      'getOrderSuccess',
      'createOrderSuccess',
      'getOrdersFail'
    );
  }

  createOrder(order) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4730/orders/save',
      data: order
    })
  }

  getOrderById(orderId) {
    $.ajax({ url: 'http://localhost:4730/orders/'+orderId})
      .done((data) => {
        this.actions.getOrderSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getOrderFail(jqXhr);
      });
  }

  getOrders() {
    $.ajax({ url: 'http://localhost:4730/orders'})
      .done((data) => {
        this.actions.getOrdersSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getOrdersFail(jqXhr);
      });
  }

  getGridData(params) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4730/orders',
      data: params
      }).done((data) => {
        this.actions.getOrdersSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getOrderFail(jqXhr);
      });
  }
}

export default alt.createActions(OrderAppActions);