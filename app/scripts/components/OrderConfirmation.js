import React from 'react';
import OrderFluxStore from '../stores/flux/OrderFluxStore';
import OrderFluxActions from '../actions/flux/OrderFluxActions';
import OrderForm from './OrderForm';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      <span>Order Confirmation</span>

      <div>
        <label>Order Id : </label> {this.props.order.orderId}
      </div>
      <div>
        <label>Order Name</label> {this.props.order.orderName}
      </div>
      <div>
        <label>Order Type</label> {this.props.order.orderType}
      </div>
      <div>
        <label>Delivery Type</label> {this.props.order.deliveryType}
      </div>
      <div>
        <label>Billing Amount</label> {this.props.payment.billAmount}
      </div>
      <div>
        <label>Payment Type</label> {this.props.payment.paymentType}
      </div> 
      <button type='submit' className='btn btn-primary' onClick={this.props.onPrevButtonClick}>Prev</button>
       <span>----------------------------------------------</span>
      <button type='submit' className='btn btn-primary' onClick={this.props.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default OrderConfirmation;