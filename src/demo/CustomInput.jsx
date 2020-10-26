import React, { Component } from 'react';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const newValue = e.target.value.toUpperCase();
    this.props.setParentValue(newValue);
    this.setState({
      value: newValue
    });
  }

  onBlur() {
    this.props.onBlur();
  }

  render() {
    const { value } = this.state;
    return (
      <input onChange={this.onChange} onBlur={this.onBlur} value={value} placeholder="Custom input capitalises text" />
    );
  }
}
