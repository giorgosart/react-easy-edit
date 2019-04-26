import React, { Component } from 'react';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.persist();
    const newValue = e.target.value.toUpperCase();
    this.setState({
      value: newValue
    }, () => this.props.onChange(e));
  }

  render() {
    const { value } = this.state;
    return (
      <input onChange={this.onChange} value={value} placeholder="This is a custom input" />
    );
  }
}