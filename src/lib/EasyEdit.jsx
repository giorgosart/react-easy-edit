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
    const { type, disableAutoSubmit, disableAutoCancel } = this.props;
    if (!disableAutoCancel && e.keyCode === 27) {
      this._onCancel();
    }

    if (!disableAutoSubmit) {
      if ((e.keyCode === 13 && type !== Types.TEXTAREA)
        || (e.keyCode === 13 && e.ctrlKey && type === Types.TEXTAREA)) {
        this._onSave();
      }
    }
  };

  _onSave = () => {
    const { onSave, onValidate } = this.props;
    const tempValue = this.state.tempValue;
    if (onValidate(tempValue)) {
      this.setState({ editing: false, value: tempValue, isValid: true },
        () => onSave(this.state.value));
    } else {
      this.setState({ isValid: false });
    }
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    const value = this.state.value;
    this.setState({ editing: false, tempValue: value }, () => onCancel());
  };

  onChange = e => {
    this.setState({ tempValue: e.target ? e.target.value : e });
  };

  onCheckboxChange = e => {
    const { options } = this.props;
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
    this.setState({ tempValue: values });
  };

  onClick = () => {
    const { allowEdit } = this.props;
    if (allowEdit) {
      this.setState({ editing: true });
    }
  };

  hoverOn = () => {
    const { allowEdit } = this.props;
    if (allowEdit) {
      this.setState({ hover: true });
    }
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  renderInput() {
    const { type, options, placeholder, attributes, editComponent, cssClassPrefix } = this.props;
    const editing = this.state.editing;
    this.cullAttributes();

    if (React.isValidElement(editComponent)) {
      return (
        <EasyCustom
          setValue={this.onChange}
          value={this.state.tempValue}
          cssClassPrefix={cssClassPrefix}
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
            cssClassPrefix={cssClassPrefix}
          />
        );
      case Types.COLOR:
        return (
          <EasyColor
            value={editing ? this.state.tempValue : this.state.value}
            onChange={this.onChange}
            attributes={attributes}
            cssClassPrefix={cssClassPrefix}
          />
        );
      case Types.TEXTAREA:
        return (
          <EasyParagraph
            value={editing ? this.state.tempValue : this.state.value}
            placeholder={placeholder}
            onChange={this.onChange}
            attributes={attributes}
            cssClassPrefix={cssClassPrefix}
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
            cssClassPrefix={cssClassPrefix}
          />
        );
      case Types.RADIO:
        return (
          <EasyRadio
            value={editing ? this.state.tempValue : this.state.value}
            onChange={this.onChange}
            options={options}
            attributes={attributes}
            cssClassPrefix={cssClassPrefix}
          />
        );
      case Types.CHECKBOX:
        return (
          <EasyCheckbox
            value={editing ? this.state.tempValue : this.state.value}
            onChange={this.onCheckboxChange}
            options={options}
            attributes={attributes}
            cssClassPrefix={cssClassPrefix}
          />
        );
      case Types.DATALIST:
        return (
          <EasyDatalist
            value={editing ? this.state.tempValue : this.state.value}
            onChange={this.onChange}
            options={options}
            attributes={attributes}
            cssClassPrefix={cssClassPrefix}
          />
        );
      default: {
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  }

  renderButtons() {
    const { saveButtonLabel, saveButtonStyle, cancelButtonLabel, cancelButtonStyle, cssClassPrefix, hideSaveButton, hideCancelButton } = this.props;
    return (
      <div className={cssClassPrefix + "easy-edit-button-wrapper"}>
        {!hideSaveButton && EasyEdit.generateButton(this.saveButton, this._onSave, saveButtonLabel,
          (saveButtonStyle === null ? cssClassPrefix + Globals.DEFAULT_BUTTON_CSS_CLASS : saveButtonStyle), "save")}
        {!hideCancelButton && EasyEdit.generateButton(this.cancelButton, this._onCancel, cancelButtonLabel,
          (cancelButtonStyle === null ? cssClassPrefix + Globals.DEFAULT_BUTTON_CSS_CLASS : cancelButtonStyle), "cancel")}
      </div>
    )
  }

  renderValidationMessage() {
    const { validationMessage, cssClassPrefix } = this.props;
    if (!this.state.isValid) {
      return (
        <div className={cssClassPrefix + "easy-edit-validation-error"}>{validationMessage}</div>
      )
    }
  }

  renderInstructions() {
    const { instructions, cssClassPrefix } = this.props;
    if (this.state.editing && instructions !== null) {
      return (
        <div className={cssClassPrefix + "easy-edit-instructions"}>{instructions}</div>
      )
    }
  }

  setCssClasses(existingClasses) {
    const {viewAttributes, cssClassPrefix, onHoverCssClass} = this.props;

    if (viewAttributes["class"]) {
      existingClasses += " " + viewAttributes["class"];
    }
    if (viewAttributes["className"]) {
      existingClasses += " " + viewAttributes["className"];
    }

    if (!this.props.allowEdit) {
      return cssClassPrefix + 'easy-edit-not-allowed ' + existingClasses;
    } else if (this.state.hover) {
      return onHoverCssClass === Globals.DEFAULT_ON_HOVER_CSS_CLASS ?
          cssClassPrefix + 'easy-edit-hover-on ' + existingClasses :
          onHoverCssClass + ' ' + existingClasses;
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
    const { type, placeholder, displayComponent, viewAttributes, cssClassPrefix } = this.props;
    this.cullAttributes();
    const cssWrapperClass = cssClassPrefix + 'easy-edit-wrapper';

    if (React.isValidElement(displayComponent)) {
      return (
        <div
          {...viewAttributes}
          className={this.setCssClasses(cssWrapperClass)}
          onClick={this.onClick}
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
        >
          {this.state.value ?
            React.cloneElement(displayComponent, { value: this.state.value }) :
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
      case Types.RANGE:
      case Types.PASSWORD: {
        return (
          <div
            {...viewAttributes}
            className={this.setCssClasses(cssWrapperClass)}
            onClick={this.onClick}
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
          >
            {this.state.value ? (type === Types.PASSWORD ? "••••••••" : this.state.value) : placeholder}
          </div>
        );
      }
      case Types.RADIO:
      case Types.CHECKBOX:
      case Types.SELECT: {
        return (
          <div
            {...viewAttributes}
            className={this.setCssClasses(cssWrapperClass)}
            onClick={this.onClick}
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
          >
            {this.renderComplexView()}
          </div>
        );
      }
      case Types.COLOR: {
        return (
          <input
            {...viewAttributes}
            type={type}
            value={this.state.value}
            onClick={this.onClick}
            readOnly
          />
        );
      }
      default: {
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  }

  renderComplexView() {
    const { placeholder, options, type } = this.props;

    if (this.state.value === null || this.state.value.length === 0) {
      return placeholder;
    }

    let selected;
    if (Types.CHECKBOX === type) {
      selected = options.filter((option) => {
        return this.state.value.includes(option.value);
      });
    } else {
      selected = options.filter((option) => {
        return this.state.value === option.value;
      });
    }

    if (selected.length !== 0) {
      return selected.map(checkbox => checkbox.label).join(', ');
    } else {
      return this.state.value;
    }
  }

  cullAttributes() {
    const { attributes } = this.props;
    delete attributes["type"];
    delete attributes["onChange"];
    delete attributes["value"];
  }

  render() {
    const { cssClassPrefix, buttonsPosition } = this.props;
    if (this.state.editing) {
      return (
        <div className={cssClassPrefix + "easy-edit-inline-wrapper"} tabIndex="0" onKeyDown={(e) => this.onKeyDown(e)}>
          {buttonsPosition === Globals.POSITION_BEFORE && this.renderButtons()}
          {this.renderInput()}
          {buttonsPosition === Globals.POSITION_AFTER && this.renderButtons()}
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
  buttonsPosition: PropTypes.oneOf(['after', 'before']),
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onValidate: PropTypes.func,
  validationMessage: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool,
  attributes: PropTypes.object,
  viewAttributes: PropTypes.object,
  instructions: PropTypes.string,
  editComponent: PropTypes.element,
  displayComponent: PropTypes.element,
  disableAutoSubmit: PropTypes.bool,
  disableAutoCancel: PropTypes.bool,
  cssClassPrefix: PropTypes.string,
  hideSaveButton: PropTypes.bool,
  hideCancelButton: PropTypes.bool,
  onHoverCssClass: PropTypes.string
};

EasyEdit.defaultProps = {
  value: null,
  saveButtonLabel: Globals.DEFAULT_SAVE_BUTTON_LABEL,
  saveButtonStyle: null,
  cancelButtonLabel: Globals.DEFAULT_CANCEL_BUTTON_LABEL,
  cancelButtonStyle: null,
  buttonsPosition: Globals.POSITION_AFTER,
  placeholder: Globals.DEFAULT_PLACEHOLDER,
  allowEdit: true,
  onCancel: () => { },
  onValidate: value => true,
  validationMessage: Globals.FAILED_VALIDATION_MESSAGE,
  attributes: {},
  viewAttributes: {},
  instructions: null,
  editComponent: null,
  placeholderComponent: null,
  disableAutoSubmit: false,
  disableAutoCancel: false,
  cssClassPrefix: '',
  hideSaveButton: false,
  hideCancelButton: false,
  onHoverCssClass: Globals.DEFAULT_ON_HOVER_CSS_CLASS
};
