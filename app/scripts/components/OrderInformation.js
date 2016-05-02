import React from 'react';
import OrderFluxStore from '../stores/flux/OrderFluxStore';
import OrderFluxActions from '../actions/flux/OrderFluxActions';
import OrderForm from './OrderForm';

class OrderInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      <span>Order Information</span>
         <OrderForm order={this.props.order} onChange= {this.props.onChange}/>
         <button type='submit' className='btn btn-primary' onClick={this.props.onNextButtonClick}>Next</button>
      </div>
    );
  }
}

export default OrderInformation;