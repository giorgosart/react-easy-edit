import React, { Component } from 'react';

export default class EasyCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    this.setState({
      value
    }, () => this.props.setValue(value));
  }

  render() {
    const { value } = this.state;
    const { children, cssClassPrefix } = this.props;
    const child = React.cloneElement(
      React.Children.only(children),
      {
        setParentValue: this.setValue,
        value
      }
    );
    return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        {child}
      </div>
    );
  }
}
