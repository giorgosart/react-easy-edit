import React from 'react';
import PropTypes from 'prop-types';
import './Editable.css';

export default class Editable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      hover: false,
      value: props.value || ''
    };

    this.saveButton = React.createRef();
    this.cancelButton = React.createRef();
    this.inputBox = React.createRef();

    this.onClick = this.onClick.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
  }

  _onSave = () => {
    const {onSave} = this.props;
    this.setState({editing: false}, () => onSave(this.state.value));
  };

  _onCancel = () => {
    const {onCancel} = this.props;
    this.setState({editing: false}, () => onCancel());
  };

  onChange = e => {
    this.setState({value: e.target.value});
  };

  onCheckboxChange = e => {
    let values = this.state.value;
    if (e.target.checked) {
      if (!values.includes(e.target.value)) {
        values.push(e.target.value);
      }
    } else {
      values.splice(values.indexOf(e.target.value), 1);
    }

    this.setState({value: values});
  };

  onClick() {
    this.setState({editing: true});
  }

  hoverOn() {
    this.setState({hover: true});
  }

  hoverOff() {
    this.setState({hover: false});
  }

  renderInput() {
    const {type, options, placeholder, name} = this.props;
    switch (type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
      case 'datetime-local':
      case 'color':
      case 'time':
      case 'month':
      case 'week':
        return this.getInput(type, placeholder);
      case 'textarea':
        return this.getTextarea(placeholder);
      case 'select':
        return this.getSelect(options);
      case 'radio':
        return this.getRadio(options, type);
      case 'checkbox':
        return this.getCheckbox(options, type, name);
    }
  }

  getCheckbox(options, type, name) {
    return options.map(option => (
        <label className="editable-checkbox-label">
          <input
              type={type}
              className="editable-radio-button"
              value={option.value}
              name={name}
              onChange={this.onCheckboxChange}
              checked={this.state.value.includes(option.value)}
          />{option.label}
        </label>
    ));
  }

  getRadio(options, type) {
    return options.map(option => (
        <label className="editable-radio-label">
          <input
              key={option.value}
              ref={this.inputBox}
              type={type}
              className="editable-radio-button"
              value={option.value}
              onChange={this.onChange}
              checked={option.value === this.state.value}
          />{option.label}
        </label>
    ));
  }

  getSelect(options) {
    let opt = options.map(option => (
        <option
            value={option.value}
            selected={option.value === this.state.value}
        >
          {option.label}
        </option>
    ));
    return (
        <select
            onChange={this.onChange}
            ref={this.inputBox}
        >
          {opt}
        </select>
    );
  }

  getTextarea(placeholder) {
    return <textarea
        ref={this.inputBox}
        value={this.state.value}
        onChange={this.onChange}
        placeholder={placeholder}
    />;
  }

  getInput(type, placeholder) {
    return <input
        ref={this.inputBox}
        type={type}
        value={this.state.value}
        onChange={this.onChange}
        placeholder={placeholder}
    />;
  }

  renderButtons() {
    const {saveButtonLabel, saveButtonStyle, cancelButtonLabel, cancelButtonStyle} = this.props;
    return (
        <>
          {Editable.generateButton(this.saveButton, this._onSave,
              saveButtonLabel, saveButtonStyle, "save")}
          {Editable.generateButton(this.cancelButton, this._onCancel,
              cancelButtonLabel, cancelButtonStyle,"cancel")}
        </>
    )
  }

  static generateButton(ref, onClick, label, cssClass, name) {
    return (
        <button ref={ref} onClick={onClick} className={cssClass} name={name}>
          {label}
        </button>
    )
  }

  renderPlaceholder() {
    const {type, placeholder} = this.props;
    switch (type) {
      case 'text':
      case 'select':
      case 'radio':
      case 'email':
      case 'textarea':
      case 'number':
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
        return (
            <div
                className={this.state.hover ? 'editable-hover-on' : ''}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {this.state.value ? this.state.value : placeholder}
            </div>
        );
      case 'color':
        return <input
            type={type}
            value={this.state.value}
            onClick={this.onClick}
            placeholder={placeholder}
        />;
      case 'checkbox':
        console.log(this.state.value);
        return this.state.value.map(value => (
            <div
                className={this.state.hover ? 'editable-hover-on' : ''}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {value}
            </div>
        ))
    }
  }

  render() {
    if (this.state.editing) {
      return (
          <div className="inline-wrapper">
            {this.renderInput()}
            {this.renderButtons()}
          </div>)
    } else {
      return this.renderPlaceholder()
    }
  }
}

Editable.propTypes = {
  type: PropTypes.oneOf([
    'text', 'number', 'color', 'email', 'textarea', 'date', 'datetime-local',
    'time', 'month', 'week', 'radio', 'checkbox', 'select'
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  options: PropTypes.array,
  saveButtonLabel: PropTypes.string,
  saveButtonStyle: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  cancelButtonStyle: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

Editable.defaultProps = {
  value: null,
  saveButtonLabel: 'Save',
  saveButtonStyle: 'editable-button',
  cancelButtonLabel: 'Cancel',
  cancelButtonStyle: 'editable-button',
  placeholder: 'Click to edit',
  onCancel: () => {
  }
};
