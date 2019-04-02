import React, { Component } from 'react';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  render() {
    const { value } = this.state;
    const { onChange } = this.props;
    return (
      <input onChange={onChange} value={value} placeholder="This is a custom input" />
    );
  }
}