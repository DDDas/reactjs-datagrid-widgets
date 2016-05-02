import React from 'react';
import assign from 'lodash/object/assign';
import OrderFluxStore from '../stores/flux/OrderFluxStore';
import OrderFluxActions from '../actions/flux/OrderFluxActions';
import OrderInformation from './OrderInformation';
import PaymentInformation from './PaymentInformation';
import OrderConfirmation from './OrderConfirmation';

class OrderWdget extends React.Component {
  constructor(props) {
    super(props);
    this.state = OrderFluxStore.getState();
    this._onBlur = this._onBlur.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onNextButtonClick = this._onNextButtonClick.bind(this);
    this._onPrevButtonClick = this._onPrevButtonClick.bind(this);
  }

  componentWillMount() {
        this.appStoreId = OrderFluxStore.listen(() => { 
          this.updateState(); 
        });
  }

  componentWillUnmount() {
      OrderFluxStore.unlisten(this.appStoreId);
  }

  updateState() {
      this.setState({
          route: OrderFluxStore.get('route')
      });
  }

  _onChange(event) {
    var fieldName = event.target.name; 
    var fieldValue = event.target.value;
    var resource = event.target.getAttribute('resource');
    this.state[resource][fieldName] = fieldValue;
    this.setState({[resource]: this.state[resource]});
  }

  _onBlur() {
      // Validate
  }

  _onNextButtonClick() {
      OrderFluxActions.validateAndGoNextPane(this.state, 'next');
  }

  _onPrevButtonClick() {
      OrderFluxActions.goPrevPane(this.state, 'prev');
  }

  _onSubmit() {
      // Validate
      var order = assign({}, this.state.order, this.state.payment );
      OrderFluxActions.saveOrder(order);
  }

  render() {
    let Route;
        switch (this.state.route) {
            case 'orderInformation': Route = OrderInformation; break;
            case 'paymentInformation': Route = PaymentInformation; break;
            case 'orderConfirmation': Route = OrderConfirmation; break;
            default: Route = OrderInformation;
        }

    return (
      <Route order={this.state.order}
             payment={this.state.payment}
             onBlur={this._onBlur}
             onChange = {this._onChange}
             onNextButtonClick={this._onNextButtonClick}
             onPrevButtonClick={this._onPrevButtonClick}
             onSubmit={this._onSubmit}/>
    );
  }
}

export default OrderWdget;