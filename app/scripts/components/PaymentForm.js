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
              <label>Billing Amount</label>
              <InputField name='billAmount' value={this.props.payment.billAmount} resource={'payment'}  handleChange={this.props.onChange}/>
            </div>
            <div>
              <label>Payment Type</label>
              <InputField name='paymentType' value={this.props.payment.paymentType} resource={'payment'}  handleChange={this.props.onChange}/>
            </div>            
      </div>
    );
  }
}

export default OrderForm;