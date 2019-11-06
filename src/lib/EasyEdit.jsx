import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

// local modules
import Globals from './globals';
import EasyDropdown from './EasyDropdown.jsx';
import EasyInput from "./EasyInput.jsx";
import EasyParagraph from "./EasyParagraph.jsx";
import EasyRadio from "./EasyRadio.jsx";
import EasyCheckbox from "./EasyCheckbox.jsx";
import EasyColor from "./EasyColor.jsx";
import EasyDatalist from "./EasyDatalist.jsx";
import EasyCustom from './EasyCustom.jsx';

export default class EasyEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      hover: false,
      value: props.value,
      tempValue: props.value,
      isValid: true
    };

    this.saveButton = React.createRef();
    this.cancelButton = React.createRef();

    this.onClick = this.onClick.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        tempValue: this.props.value,
        value: this.props.value
      });
    }
  }

  onKeyDown = (e) => {
    const {type} = this.props;
    if (e.keyCode === 27) {
      this._onCancel();
    }
    if (e.keyCode === 13 && type !== Types.TEXTAREA){
      this._onSave();
    }
  };

  _onSave = () => {
    const {onSave, onValidate} = this.props;
    const tempValue = this.state.tempValue;
    if (onValidate(tempValue)) {
      this.setState({editing: false, value: tempValue},
          () => onSave(this.state.value));
    } else {
      this.setState({isValid: false});
    }
  };

  _onCancel = () => {
    const {onCancel} = this.props;
    const value = this.state.value;
    this.setState({editing: false, tempValue: value}, () => onCancel());
  };

  onChange = e => {
    this.setState({tempValue: e.target ? e.target.value : e});
  };

  onCheckboxChange = e => {
    const {options} = this.props;
    let values = this.state.tempValue || [];
    if (e.target.checked && !values.includes(e.target.value)) {
      values.push(e.target.value);
    } else {
      values.splice(values.indexOf(e.target.value), 1);
    }
    // filter out the orphaned values that have no option entry
    let optionValues = options.map(o => o.value);
    values = values.filter((value) => {
      return optionValues.includes(value);
    });
    this.setState({tempValue: values});
  };

  onClick() {
    const {allowEdit} = this.props;
    if (allowEdit) {
      this.setState({editing: true});
    }
  }

  hoverOn() {
    const {allowEdit} = this.props;
    if (allowEdit) {
      this.setState({hover: true});
    }
  }

  hoverOff() {
    this.setState({hover: false});
  }

  renderInput() {
    const {type, options, placeholder, attributes, editComponent} = this.props;
    const editing = this.state.editing;
    this.cullAttributes();

    if (React.isValidElement(editComponent)) {
      return (
        <EasyCustom
          setValue={newValue => {
            this.onChange(newValue);
          }}
          value={this.state.tempValue}
        >
          {editComponent}
        </EasyCustom>
      );
    }

    switch (type) {
      case Types.TEXT:
      case Types.PASSWORD:
      case Types.EMAIL:
      case Types.NUMBER:
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.TIME:
      case Types.MONTH:
      case Types.WEEK:
      case Types.RANGE:
        return (
            <EasyInput
                value={editing ? this.state.tempValue : this.state.value}
                placeholder={placeholder}
                onChange={this.onChange}
                type={type}
                attributes={attributes}
            />
        );
      case Types.COLOR:
        return (
            <EasyColor
                value={editing ? this.state.tempValue : this.state.value}
                onChange={this.onChange}
                attributes={attributes}
            />
        );
      case Types.TEXTAREA:
        return (
            <EasyParagraph
                value={editing ? this.state.tempValue : this.state.value}
                placeholder={placeholder}
                onChange={this.onChange}
                attributes={attributes}
            />);
      case Types.SELECT:
        return (
            <EasyDropdown
                value={editing ? this.state.tempValue : this.state.value}
                onChange={this.onChange}
                options={options}
                placeholder={placeholder === Globals.DEFAULT_PLACEHOLDER
                    ? Globals.DEFAULT_SELECT_PLACEHOLDER : placeholder}
                attributes={attributes}
            />
        );
      case Types.RADIO:
        return (
            <EasyRadio
                value={editing ? this.state.tempValue : this.state.value}
                onChange={this.onChange}
                options={options}
                attributes={attributes}
            />
        );
      case Types.CHECKBOX:
        return (
            <EasyCheckbox
                value={editing ? this.state.tempValue : this.state.value}
                onChange={this.onCheckboxChange}
                options={options}
                attributes={attributes}
            />
        );
      case Types.DATALIST:
        return (
          <EasyDatalist
              value={editing ? this.state.tempValue : this.state.value}
              onChange={this.onChange}
              options={options}
              attributes={attributes}
          />
        );
      default: {
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  }

  renderButtons() {
    const {saveButtonLabel, saveButtonStyle, cancelButtonLabel, cancelButtonStyle} = this.props;
    return (
        <div className="easy-edit-button-wrapper">
          {EasyEdit.generateButton(this.saveButton, this._onSave,
              saveButtonLabel, saveButtonStyle, "save")}
          {EasyEdit.generateButton(this.cancelButton, this._onCancel,
              cancelButtonLabel, cancelButtonStyle, "cancel")}
        </div>
    )
  }

  renderValidationMessage() {
    const {validationMessage} = this.props;
    if (!this.state.isValid) {
      return (
          <div className="easy-edit-validation-error">{validationMessage}</div>
      )
    }
  }

  renderInstructions() {
    const {instructions} = this.props;
    if (this.state.editing && instructions !== null) {
      return (
          <div className="easy-edit-instructions">{instructions}</div>
      )
    }
  }

  setCssClasses(existingClasses) {
    if (!this.props.allowEdit) {
      return 'easy-edit-not-allowed ' + existingClasses;
    } else if (this.state.hover) {
      return 'easy-edit-hover-on ' + existingClasses;
    } else {
      return existingClasses;
    }
  }

  static generateButton(ref, onClick, label, cssClass, name) {
    return (
        <button ref={ref} onClick={onClick} className={cssClass} name={name}>
          {label}
        </button>
    )
  }

  renderPlaceholder() {
    const {type, placeholder, options, displayComponent} = this.props;
    this.cullAttributes();

    if (React.isValidElement(displayComponent)) {
      return (
        <div
          className={this.setCssClasses('easy-edit-wrapper')}
          onClick={this.onClick}
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
        >
          { this.state.value ?
              React.cloneElement(displayComponent, {value: this.state.value}) :
              placeholder}
        </div>
      );
    }

    switch (type) {
      case Types.TEXT:
      case Types.DATALIST:
      case Types.EMAIL:
      case Types.TEXTAREA:
      case Types.NUMBER:
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.TIME:
      case Types.MONTH:
      case Types.WEEK:
      case Types.RANGE: {
        return (
            <div
                className={this.setCssClasses('easy-edit-wrapper')}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {this.state.value ? this.state.value : placeholder}
            </div>
        );
      }
      case Types.PASSWORD: {
        return (
            <div
                className={this.setCssClasses('easy-edit-wrapper')}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {this.state.value ? "••••••••" : placeholder}
            </div>
        );
      }
      case Types.RADIO:
      case Types.SELECT: {
        let selected;
        if (this.state.value) {
          selected = options.filter((option) => {
            return this.state.value.includes(option.value);
          });
        }
        return (
            <div
                className={this.setCssClasses('easy-edit-wrapper')}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {this.state.value ? (selected ? this.state.value : selected[0].label) : placeholder}
            </div>
        );
      }
      case Types.COLOR:
        return (
            <input
                type={type}
                value={this.state.value}
                onClick={this.onClick}
                readOnly
            />
        );
      case Types.CHECKBOX: {
        return (
            <div
                className={this.setCssClasses('easy-edit-wrapper')}
                onClick={this.onClick}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
              {this.renderCheckboxPlaceholder()}
            </div>);
      }
      default: {
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  }

  renderCheckboxPlaceholder(){
    const {placeholder, options} = this.props;

    if (this.state.value === null || this.state.value.length === 0) {
      return placeholder;
    }

    let selected = options.filter((option) => {
      return this.state.value.includes(option.value);
    });

    if (selected.length !== 0) {
      return selected.map(checkbox => checkbox.label).join(', ');
    } else {
      return this.state.value;
    }
  }

  cullAttributes() {
    const {attributes} = this.props;

    if (typeof attributes !== 'undefined') {
      delete attributes["type"];
      delete attributes["onChange"];
      delete attributes["value"];
    }
  }

  render() {
    if (this.state.editing) {
      return (
          <div className="easy-edit-inline-wrapper" tabIndex="0" onKeyDown={(e) => this.onKeyDown(e)}>
            {this.renderInput()}
            {this.renderButtons()}
            {this.renderInstructions()}
            {this.renderValidationMessage()}
          </div>)
    } else {
      return this.renderPlaceholder()
    }
  }
}

export const Types = {
  COLOR: 'color',
  CHECKBOX: 'checkbox',
  DATALIST: 'datalist',
  DATE: 'date',
  DATETIME_LOCAL: 'datetime-local',
  EMAIL: 'email',
  MONTH: 'month',
  NUMBER: 'number',
  PASSWORD: 'password',
  RADIO: 'radio',
  RANGE: 'range',
  SELECT: 'select',
  TEXT: 'text',
  TEXTAREA: 'textarea',
  TIME: 'time',
  WEEK: 'week'
};

Object.freeze(Types);

EasyEdit.propTypes = {
  type: PropTypes.oneOf([
    'text', 'number', 'color', 'textarea', 'date', 'datetime-local', 'email', 'password',
    'time', 'month', 'week', 'radio', 'checkbox', 'select', 'range', 'datalist'
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  options: PropTypes.array,
  saveButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  saveButtonStyle: PropTypes.string,
  cancelButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  cancelButtonStyle: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onValidate: PropTypes.func,
  validationMessage: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool,
  attributes: PropTypes.object,
  instructions: PropTypes.string,
  editComponent: PropTypes.element,
  displayComponent: PropTypes.element
};

EasyEdit.defaultProps = {
  value: null,
  saveButtonLabel: Globals.DEFAULT_SAVE_BUTTON_LABEL,
  saveButtonStyle: Globals.DEFAULT_BUTTON_CSS_CLASS,
  cancelButtonLabel: Globals.DEFAULT_CANCEL_BUTTON_LABEL,
  cancelButtonStyle: Globals.DEFAULT_BUTTON_CSS_CLASS,
  placeholder: Globals.DEFAULT_PLACEHOLDER,
  allowEdit: true,
  onCancel: () => {
  },
  onValidate: value => true,
  validationMessage: Globals.FAILED_VALIDATION_MESSAGE,
  instructions: null,
  editComponent: null,
  placeholderComponent: null
};
