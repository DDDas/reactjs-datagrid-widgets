import React from 'react';

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type='text' className='form-control' name={this.props.name} ref={this.props.name}  value={this.props.value} resource={this.props.resource} onChange={this.props.handleChange}/>
    );
  }
}

export default InputField;