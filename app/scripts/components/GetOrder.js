import React from 'react';
import {Link} from 'react-router';
import OrderAppStore from '../stores/alt/OrderAppStore';
import OrderAppActions from '../actions/alt/OrderAppActions';

class GetOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = OrderAppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrderAppStore.listen(this.onChange);
    OrderAppActions.getOrderById(this.props.params.id);
  }

  componentWillUnmount() {
    OrderAppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

   render() {
    return (
        <div className='list-group-item'>
            {this.state.order.orderId}

            {this.state.order.orderName}

            {this.state.order.billAmount}
        </div>
    );
  }
}

export default GetOrder;