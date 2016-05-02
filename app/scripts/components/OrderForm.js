import React from 'react';
import InputField from './InputField';
import OrderFluxStore from '../stores/flux/OrderFluxStore';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
    return (
      <div>
            <div>
              <label>Order Id</label>
              <InputField name='orderId' value={this.props.order.orderId} resource={'order'} handleChange={this.props.onChange}/>
            </div>
            <div>
              <label>Order Name</label>
              <InputField name='orderName' value={this.props.order.orderName} resource={'order'} handleChange={this.props.onChange}/>
            </div>
            <div>
              <label>Order Type</label>
              <InputField name='orderType' value={this.props.order.orderType} resource={'order'} handleChange={this.props.onChange}/>
            </div>
            <div>
              <label>Delivery Type</label>
              <InputField name='deliveryType' value={this.props.order.deliveryType} resource={'order'} handleChange={this.props.onChange}/>
            </div>
            
      </div>
    );
  }
}

export default OrderForm;