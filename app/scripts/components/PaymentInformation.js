import React from 'react';
import OrderFluxStore from '../stores/flux/OrderFluxStore';
import OrderFluxActions from '../actions/flux/OrderFluxActions';
import PaymentForm from './PaymentForm';

class PaymentInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (      
      <div className='container'>
        <span>Payment Information</span>
        <PaymentForm payment={this.props.payment} onChange={this.props.onChange}/>
        <button type='submit' className='btn btn-primary' onClick={this.props.onPrevButtonClick}>Prev</button>
         <span>----------------------------------------------</span>
         <button type='submit' className='btn btn-primary' onClick={this.props.onNextButtonClick}>Next</button>
      </div>
    );
  }
}

export default PaymentInformation;