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
      editing: props.editMode || false,
      hover: false,
      value: props.value,
      tempValue: props.value,
      isValid: true,
      isHidden: false
    };

    this.saveButton = React.createRef();
    this.editButton = React.createRef();
    this.cancelButton = React.createRef();
    this.deleteButton = React.createRef();
  }

  isNullOrUndefinedOrEmpty(value) {
    return value === null || value === undefined || value === '';
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        tempValue: this.props.value,
        value: this.props.value,
      });
    }

    if (this.props.editMode !== prevProps.editMode) {
      this.setState({ editing: this.props.editMode });
      if (!this.props.editMode) {
        this._onSave();
      }
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
      this.setState({ editing: false, value: tempValue, isValid: true, hover: false },
        () => onSave(this.state.value));
    } else {
      this.setState({ isValid: false });
    }
  };

  _onBlur = () => {
    const { onBlur, saveOnBlur, cancelOnBlur } = this.props;
    if (saveOnBlur && cancelOnBlur) {
      console.warn("EasyEdit: You've set both `saveOnBlur` and `cancelOnBlur` to true, please set either one to false.")
    }
    if (saveOnBlur) {
      onBlur(this.state.tempValue);
      this._onSave();
    } else if (cancelOnBlur) {
      this._onCancel();
    } else {
      onBlur(this.state.tempValue);
    }
  };

  _onFocus = () => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(this.state.tempValue);
    }
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    const value = this.state.value;
    this.setState({ editing: false, tempValue: value, hover: false }, () => onCancel());
  };

  _onDelete = () => {
    const { onDelete } = this.props;
    const value = this.state.value;
    this.setState({ editing: false, tempValue: value, hover: false, isHidden: true }, () => onDelete());
  };

  _editing = () => {
    this.setState({ editing: true});
  }

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
    const {editing, value, tempValue} = this.state;
    const inputValue = editing ? tempValue : value;
    this.cullAttributes();

    if (React.isValidElement(editComponent)) {
      return (
        <EasyCustom
          setValue={this.onChange}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          value={this.state.tempValue}
          cssClassPrefix={cssClassPrefix}
        >
          {editComponent}
        </ EasyCustom>
      );
    }
    switch (type) {
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.EMAIL:
      case Types.FILE:
      case Types.MONTH:
      case Types.NUMBER:
      case Types.PASSWORD:
      case Types.RANGE:
      case Types.TEL:
      case Types.TEXT:
      case Types.TIME:
      case Types.URL:
      case Types.WEEK:
        return (
            <EasyInput
                value={inputValue}
                placeholder={placeholder}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                type={type}
                attributes={attributes}
                cssClassPrefix={cssClassPrefix}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            />
        );
      case Types.COLOR:
        return (
            <EasyColor
                value={inputValue}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                attributes={attributes}
                cssClassPrefix={cssClassPrefix}
            />
        );
      case Types.TEXTAREA:
        return (
            <EasyParagraph
                value={inputValue}
                placeholder={placeholder}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                attributes={attributes}
                cssClassPrefix={cssClassPrefix}
            />);
      case Types.SELECT:
        return (
            <EasyDropdown
                value={inputValue}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
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
                value={inputValue}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                options={options}
                attributes={attributes}
                cssClassPrefix={cssClassPrefix}
            />
        );
      case Types.CHECKBOX:
        return (
            <EasyCheckbox
                value={inputValue}
                onChange={this.onCheckboxChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                options={options}
                attributes={attributes}
                cssClassPrefix={cssClassPrefix}
            />
        );
      case Types.DATALIST:
        return (
            <EasyDatalist
                value={inputValue}
                onChange={this.onChange}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
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
    const { saveOnBlur, saveButtonLabel, saveButtonStyle, cancelButtonLabel, cancelButtonStyle, deleteButtonLabel,
      deleteButtonStyle, cssClassPrefix, hideSaveButton, hideCancelButton, hideDeleteButton, showEditViewButtonsOnHover } = this.props;
    if (!showEditViewButtonsOnHover || showEditViewButtonsOnHover && this.state.hover) {
      return (
          <div className={cssClassPrefix + "easy-edit-button-wrapper"}>
            {!hideSaveButton && EasyEdit.generateButton(this.saveButton, this._onSave, saveButtonLabel,
                this.manageButtonStyle(saveButtonStyle), "save", saveOnBlur)}
            {!hideCancelButton && EasyEdit.generateButton(this.cancelButton, this._onCancel, cancelButtonLabel,
                this.manageButtonStyle(cancelButtonStyle), "cancel", saveOnBlur)}
            {!hideDeleteButton && EasyEdit.generateButton(this.deleteButton, this._onDelete, deleteButtonLabel,
                this.manageButtonStyle(deleteButtonStyle), "delete", saveOnBlur)}
          </div>
      )
    }
  }

  manageButtonStyle(saveButtonStyle) {
    const {cssClassPrefix} = this.props;
    return saveButtonStyle === null ? cssClassPrefix
        + Globals.DEFAULT_BUTTON_CSS_CLASS : saveButtonStyle;
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
    const { instructions, cssClassPrefix, editMode } = this.props;
    if ((this.state.editing || editMode) && instructions !== null) {
      return (
        <div className={cssClassPrefix + "easy-edit-instructions"}>{instructions}</div>
      )
    }
  }

  setCssClasses(existingClasses) {
    const { viewAttributes, cssClassPrefix, onHoverCssClass } = this.props;

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

  static generateButton(ref, onClick, label, cssClass, name, saveOnBlur) {
    if (saveOnBlur) {
      return "";
    }
    return (
      <button ref={ref} onClick={onClick} className={cssClass} name={name}>
        {label}
      </button>
    )
  }

  renderPlaceholder() {
    const { type, placeholder, displayComponent, viewAttributes, cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle } = this.props;
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
          {!this.isNullOrUndefinedOrEmpty(this.state.value) ?
              React.cloneElement(displayComponent, {value: this.state.value}) :
              placeholder}
          {this.generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
        </div>
      );
    }

    switch (type) {
      case Types.DATALIST:
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.EMAIL:
      case Types.FILE:
      case Types.TEXT:
      case Types.TEL:
      case Types.TEXTAREA:
      case Types.NUMBER:
      case Types.TIME:
      case Types.MONTH:
      case Types.RANGE:
      case Types.WEEK:
      case Types.URL:
      case Types.PASSWORD: {
        let passwordValue = type === Types.PASSWORD ? "••••••••" : this.state.value;
        return (
          <div
              {...viewAttributes}
              className={this.setCssClasses(cssWrapperClass)}
              onClick={this.onClick}
              onMouseEnter={this.hoverOn}
              onMouseLeave={this.hoverOff}
          >
            {!this.isNullOrUndefinedOrEmpty(this.state.value) ? passwordValue : placeholder}
            {this.generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
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
            {this.generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
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

  generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle) {
    const {showViewButtonsOnHover} = this.props;

    if (!showViewButtonsOnHover || showViewButtonsOnHover && this.state.hover) {
      return (!hideEditButton && <div className={cssClassPrefix + "easy-edit-view-button-wrapper"}>
        {EasyEdit.generateButton(this.editButton, this._editing,
            editButtonLabel, this.manageButtonStyle(editButtonStyle), "edit")}
      </div>);
    }
  }

  renderComplexView() {
    const { placeholder, options, type } = this.props;

    if (this.isNullOrUndefinedOrEmpty(this.state.value)) {
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
    const { cssClassPrefix, buttonsPosition, editMode } = this.props;
    if (this.state.isHidden) {
      return "";
    }

    if (this.state.editing || editMode) {
      return (
        <div className={cssClassPrefix + "easy-edit-inline-wrapper"} tabIndex="0"
             onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}
             onKeyDown={(e) => this.onKeyDown(e)}>
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
  CHECKBOX: 'checkbox',
  COLOR: 'color',
  DATALIST: 'datalist',
  DATE: 'date',
  DATETIME_LOCAL: 'datetime-local',
  EMAIL: 'email',
  FILE: 'file',
  MONTH: 'month',
  NUMBER: 'number',
  PASSWORD: 'password',
  RADIO: 'radio',
  RANGE: 'range',
  SELECT: 'select',
  TEL: 'tel',
  TEXT: 'text',
  TEXTAREA: 'textarea',
  TIME: 'time',
  URL: 'url',
  WEEK: 'week'
};

Object.freeze(Types);

EasyEdit.propTypes = {
  type: PropTypes.oneOf([
    'checkbox', 'color', 'datalist', 'date', 'datetime-local', 'email', 'file',
    'month', 'number', 'password', 'radio', 'range', 'select', 'tel', 'text',
    'textarea', 'time', 'url', 'week'
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
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
  deleteButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  deleteButtonStyle: PropTypes.string,
  editButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  editButtonStyle: PropTypes.string,
  buttonsPosition: PropTypes.oneOf(['after', 'before']),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onValidate: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  validationMessage: PropTypes.string,
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
  hideDeleteButton: PropTypes.bool,
  hideEditButton: PropTypes.bool,
  onHoverCssClass: PropTypes.string,
  saveOnBlur: PropTypes.bool,
  cancelOnBlur: PropTypes.bool,
  editMode: PropTypes.bool,
  showEditViewButtonsOnHover: PropTypes.bool,
  showViewButtonsOnHover: PropTypes.bool
};

EasyEdit.defaultProps = {
  value: null,
  saveButtonLabel: Globals.DEFAULT_SAVE_BUTTON_LABEL,
  saveButtonStyle: null,
  cancelButtonLabel: Globals.DEFAULT_CANCEL_BUTTON_LABEL,
  cancelButtonStyle: null,
  deleteButtonLabel: Globals.DEFAULT_DELETE_BUTTON_LABEL,
  deleteButtonStyle: null,
  editButtonLabel: Globals.DEFAULT_EDIT_BUTTON_LABEL,
  editButtonStyle: null,
  buttonsPosition: Globals.POSITION_AFTER,
  placeholder: Globals.DEFAULT_PLACEHOLDER,
  allowEdit: true,
  onCancel: () => { },
  onDelete: () => { },
  onfocus: () => { },
  onBlur: () => { },
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
  hideDeleteButton: true,
  hideEditButton: true,
  onHoverCssClass: Globals.DEFAULT_ON_HOVER_CSS_CLASS,
  saveOnBlur: false,
  cancelOnBlur: false,
  editMode: false,
  showEditViewButtonsOnHover: false,
  showViewButtonsOnHover: false
};
