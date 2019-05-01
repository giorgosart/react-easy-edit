import React, { Component } from 'react';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const newValue = e.target.value.toUpperCase();
    this.props.setParentValue(newValue);
    this.setState({
      value: newValue
    });
  }

  render() {
    const { value } = this.state;
    return (
      <input onChange={this.onChange} value={value} placeholder="Custom input capitalises text" />
    );
  }
}