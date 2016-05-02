import React from 'react';
import OrderAppStore from '../stores/alt/OrderAppStore';
import OrderAppActions from '../actions/alt/OrderAppActions';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = OrderAppStore.getState();
    this._handleRadioChange = this._handleRadioChange.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleReset = this._handleReset.bind(this);
    }

  componentDidMount() {
  }

  _handleRadioChange() {
    if(this.refs.orderTypeDineIn.checked)
    {
    this.state.filters.orderType = this.refs.orderTypeDineIn.value;    
    }
    else if(this.refs.orderTypeTakeout.checked)
    {
    this.state.filters.orderType = this.refs.orderTypeTakeout.value;    
    }
    OrderAppActions.updateFilters(this.state.filters);
    OrderAppActions.getGridData(this.state.filters);
  }

  _handleChange(event) {
    var fieldValue = event.target.value;
    var fieldName = event.target.name;
    this.state.filters[fieldName] = fieldValue;
    OrderAppActions.updateFilters(this.state.filters);
    OrderAppActions.getGridData(this.state.filters);
  }

  _handleReset() {
    //Needs to be component
    this.refs.orderTypeDineIn.parentNode.className = 'btn btn-default';
    this.refs.orderTypeTakeout.parentNode.className = 'btn btn-default';
    this.refs.paymentType.selectedIndex =0;
    this.props.onReset();
  }

  _handleSearch(event) {
    var fieldValue = event.target.value;
    this.props.onSearch(fieldValue);
  }

  render() {
    return (
      
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navMenuBar" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navMenuBar">
                    <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <label className="control-label">
                                <span>Order </span>

                                <div className="btn-group" data-toggle="buttons">
                                    <label className="btn btn-default" onClick={this._handleRadioChange}>
                                        <input type="radio" name="orderType" ref="orderTypeDineIn" autoComplete="off" value='DINEIN' onChange={this._handleRadioChange}/>DINEIN
                                    </label>
                                    <label className="btn btn-default" onClick={this._handleRadioChange}>
                                        <input type="radio" name="orderType" ref="orderTypeTakeout" autoComplete="off" value='TAKEOUT' onChange={this._handleRadioChange}/>TAKEOUT
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <label className="control-label">
                                <span>Payment Type </span>
                                <select className="form-control" name="paymentType" ref="paymentType"  onChange={this._handleChange} ref="paymentType">
                                    <option value='0'>Choose...</option>
                                    <option value='VISA'>VISA</option>
                                    <option value='MASTERCARD'>MASTERCARD</option>
                                    <option value='OTHER'>{this.state.filters.orderType === 'RESTAURANT' ? 'DISCOVER' : 'AMEX'}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <label className="control-label">
                                <span>
                                <input type='text' name="searchQuery" placeholder="Search" onChange={this._handleSearch}  className='form-control'/>
                                </span>                                
                            </label>
                        </div>
                    </div>
                    <div className="navbar-form navbar-right">
                        <button type="button" className="btn btn-primary" disabled={this.props.isSubmitButtonEnabled} onClick={this._handleReset} style={{fontWeight:'bold'}}>Reset</button>
                    </div>
                </div>
            </div>
        </nav>
     
    );
  }
}

export default FilterBar;