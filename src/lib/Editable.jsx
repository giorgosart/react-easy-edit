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
        return <input
            ref={this.inputBox}
            type={type}
            value={this.state.value}
            onChange={this.onChange}
            placeholder={placeholder}
        />;
      case 'textarea':
        return <textarea
            ref={this.inputBox}
            value={this.state.value}
            onChange={this.onChange}
            placeholder={placeholder}
        />;
      case 'select':
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
      case 'radio':
        return options.map(option => (
            <label className="editable-radio-label">
              <input
                  key={option.value}
                  ref={this.inputBox}
                  type={type}
                  className="editable-radio-button"
                  value={option.value}
                  name={name}
                  onChange={this.onChange}
                  checked={option.value === this.state.value}
              />{option.label}
            </label>
        ));
      case 'checkbox':
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
        ))
    }
  }

  renderButtons() {
    const {saveButtonLabel, cancelButtonLabel} = this.props;
    return (
        <>
          {Editable.generateButton(this.saveButton, this._onSave,
              saveButtonLabel)}
          {Editable.generateButton(this.cancelButton, this._onCancel,
              cancelButtonLabel)}
        </>
    )
  }

  static generateButton(ref, onClick, label) {
    return (
        <button ref={ref} onClick={onClick} className="editable-button">
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
              {this.state.value ? this.state.value : "Click to add "
                  + placeholder}
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
  cancelButtonLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

Editable.defaultProps = {
  value: null,
  saveButtonLabel: 'Save',
  cancelButtonLabel: 'Cancel',
  placeholder: 'value',
  onCancel: () => {
  }
};