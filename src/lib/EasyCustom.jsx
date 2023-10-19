import React, { Component } from 'react';

export default class EasyCustom extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.setValue = this.setValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  setValue(value) {
    this.setState({ value }, () => this.props.setValue(value));
  }

  onBlur() {
    this.props.onBlur();
  }

  onFocus() {
    this.props.onFocus();
  }

  render() {
    const { value } = this.state;
    const { children, cssClassPrefix } = this.props;
    const child = React.cloneElement(
      React.Children.only(children),
      {
        setParentValue: this.setValue,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        value
      }
    );
    return (
      <div className={`${cssClassPrefix}easy-edit-component-wrapper`}>
        {child}
      </div>
    );
  }
}
