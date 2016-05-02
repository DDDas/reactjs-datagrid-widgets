import React from 'react';
import {Route} from 'react-router';
import Application from './components/Application';
import HomeApp from './components/HomeApp';
import OrdersDataGrid from './components/OrdersDataGrid';
import OrderWidget from './components/OrderWidget';
import GetOrder from './components/GetOrder';

export default (
  <Route component={Application}>
    <Route path='/' component={HomeApp} />
    <Route path='/orders/datagrid' component={OrdersDataGrid} />
    <Route path='/orders/widget' component={OrderWidget} />
  </Route>
);
