import React from 'react';
import ProgressBar from './ProgressBar';
import DataGrid from 'react-datagrid';
import FilterBar from './FilterBar';
import OrderAppStore from '../stores/alt/OrderAppStore';
import OrderAppActions from '../actions/alt/OrderAppActions';

class OrdersDataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = OrderAppStore.getState();
    this._onChange = this._onChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this.columns = [
     { name : 'orderId' },
     { name : 'orderName' },
     { name : 'billAmount' },
     { name : 'orderType' },
     { name : 'paymentType' },
     { name : 'deliveryType' }
    ]
   }

  componentDidMount() {
    OrderAppStore.listen(this._onChange);
    OrderAppActions.getOrders();
  }

  componentWillUnmount() {
    OrderAppStore.unlisten(this._onChange);
  }

  _onChange(state) {
    this.setState(state);
  }

  _handleReset() {
    OrderAppActions.getOrders();
  }

  _handleSearch() {
    // To be implemented
  }

  render() {
    return (
      <div>
      <FilterBar 
      filters = {this.state.filters}
      onSearch = {this._handleSearch}
      onReset = {this._handleReset}
      isSubmitButtonEnabled={this.state.submitButtonIndicator}/>
      <DataGrid idProperty='id'
                dataSource={this.state.orders}
                columns={this.columns}/>
      </div>
    );
  }
}

export default OrdersDataGrid;