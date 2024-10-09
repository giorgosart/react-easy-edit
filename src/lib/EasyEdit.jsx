import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./EasyEdit.css";

// local modules
import Globals from "./globals";
import EasyDropdown from "./EasyDropdown.jsx";
import EasyInput from "./EasyInput.jsx";
import EasyParagraph from "./EasyParagraph.jsx";
import EasyRadio from "./EasyRadio.jsx";
import EasyCheckbox from "./EasyCheckbox.jsx";
import EasyColor from "./EasyColor.jsx";
import EasyDatalist from "./EasyDatalist.jsx";
import EasyCustom from "./EasyCustom.jsx";

export const Types = {
  CHECKBOX: "checkbox",
  COLOR: "color",
  DATALIST: "datalist",
  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  EMAIL: "email",
  FILE: "file",
  MONTH: "month",
  NUMBER: "number",
  PASSWORD: "password",
  RADIO: "radio",
  RANGE: "range",
  SELECT: "select",
  TEL: "tel",
  TEXT: "text",
  TEXTAREA: "textarea",
  TIME: "time",
  URL: "url",
  WEEK: "week"
};

Object.freeze(Types);

const useHover = () => {
  const [hover, setHover] = useState(false);

  const handleHoverOn = () => setHover(true);
  const handleHoverOff = () => setHover(false);

  return [hover, handleHoverOn, handleHoverOff];
};

const useEditState = (initialValue, editMode, onSave, onCancel, onValidate) => {
  const [editing, setEditing] = useState(editMode || false);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const handleSave = useCallback(() => {
    if (onValidate(tempValue)) {
      setEditing(false);
      setValue(tempValue);
      setIsValid(true);
      onSave(tempValue);
    } else {
      setIsValid(false);
    }
  }, [onSave, onValidate, tempValue]);

  useEffect(() => {
    setTempValue(initialValue);
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (editing !== editMode) {
      setEditing(editMode);
    }
  }, [editMode]);

  const handleCancel = () => {
    setEditing(false);
    setTempValue(value);
    onCancel();
  };

  return {
    editing,
    value,
    tempValue,
    setTempValue,
    isValid,
    isHidden,
    setIsHidden,
    handleSave,
    handleCancel,
    setEditing,
  };
};

const isNullOrUndefinedOrEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

export default function EasyEdit(props) {
  const {
    type,
    value,
    options,
    saveButtonLabel,
    saveButtonStyle,
    cancelButtonLabel,
    cancelButtonStyle,
    deleteButtonLabel,
    deleteButtonStyle,
    editButtonLabel,
    editButtonStyle,
    buttonsPosition,
    placeholder,
    onCancel,
    onDelete,
    onValidate,
    onFocus,
    onBlur,
    onSave,
    validationMessage,
    allowEdit,
    attributes,
    viewAttributes,
    instructions,
    editComponent,
    displayComponent,
    disableAutoSubmit,
    disableAutoCancel,
    cssClassPrefix,
    hideSaveButton,
    hideCancelButton,
    hideDeleteButton,
    hideEditButton,
    onHoverCssClass,
    saveOnBlur,
    cancelOnBlur,
    editMode,
    showEditViewButtonsOnHover,
    showViewButtonsOnHover
  } = props;

  const [hover, handleHoverOn, handleHoverOff] = useHover();
  const {
    editing,
    tempValue,
    setTempValue,
    value: currentValue,
    isValid,
    isHidden,
    setIsHidden,
    handleSave,
    handleCancel,
    setEditing,
  } = useEditState(value, editMode, onSave, onCancel, onValidate);

  const saveButton = useRef();
  const editButton = useRef();
  const cancelButton = useRef();
  const deleteButton = useRef();

  const handleKeyDown = (e) => {
    if (!disableAutoCancel && e.keyCode === 27) {
      handleCancel();
    }

    if (!disableAutoSubmit) {
      if ((e.keyCode === 13 && type !== Types.TEXTAREA) || (e.keyCode === 13 && e.ctrlKey && type === Types.TEXTAREA)) {
        handleSave();
      }
    }
  };

  const handleBlur = () => {
    if (saveOnBlur && cancelOnBlur) {
      console.warn("EasyEdit: You've set both `saveOnBlur` and `cancelOnBlur` to true, please set either one to false.");
    }
    if (saveOnBlur) {
      onBlur(tempValue);
      handleSave();
    } else if (cancelOnBlur) {
      handleCancel();
    } else {
      onBlur(tempValue);
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus(tempValue);
    }
  };

  const handleDelete = () => {
    setEditing(false);
    setTempValue(currentValue);
    handleHoverOff();
    setIsHidden(true);
    onDelete();
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setTempValue(e.target ? e.target.value : e);
  };

  const handleCheckboxChange = (e) => {
    let values = tempValue || [];
    if (e.target.checked && !values.includes(e.target.value)) {
      values.push(e.target.value);
    } else {
      values.splice(values.indexOf(e.target.value), 1);
    }
    let optionValues = options.map((o) => o.value);
    values = values.filter((value) => optionValues.includes(value));
    setTempValue(values);
  };

  const handleClick = () => {
    if (allowEdit) {
      setEditing(true);
    }
  };

  const renderComponentView = () => {
    const inputValue = editing ? tempValue : currentValue;

    if (React.isValidElement(editComponent)) {
      return (
        <EasyCustom
          setValue={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={tempValue}
          cssClassPrefix={cssClassPrefix}
        >
          {editComponent}
        </EasyCustom>
      );
    }

    switch (type) {
      case Types.CHECKBOX:
        return renderCheckbox(inputValue);
      case Types.COLOR:
        return renderColor(inputValue);
      case Types.DATALIST:
        return renderDatalist(inputValue);
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
        return renderInput(inputValue);
      case Types.RADIO:
        return renderRadio(inputValue);
      case Types.SELECT:
        return renderSelect(inputValue);
      case Types.TEXTAREA:
        return renderTextarea(inputValue);
      default:
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
    }
  };

  const renderButtons = () => {
    if (!showEditViewButtonsOnHover || (showEditViewButtonsOnHover && hover)) {
      return (
        <div className={cssClassPrefix + "easy-edit-button-wrapper"}>
          {!hideSaveButton && generateButton(saveButton, handleSave, saveButtonLabel, manageButtonStyle(saveButtonStyle), "save", saveOnBlur)}
          {!hideCancelButton && generateButton(cancelButton, handleCancel, cancelButtonLabel, manageButtonStyle(cancelButtonStyle), "cancel", saveOnBlur)}
          {!hideDeleteButton && generateButton(deleteButton, handleDelete, deleteButtonLabel, manageButtonStyle(deleteButtonStyle), "delete", saveOnBlur)}
        </div>
      );
    }
  };

  const manageButtonStyle = (style) => {
    return style === null ? cssClassPrefix + Globals.DEFAULT_BUTTON_CSS_CLASS : style;
  };

  const renderValidationMessage = () => {
    if (!isValid) {
      return <div className={cssClassPrefix + "easy-edit-validation-error"}>{validationMessage}</div>;
    }
  };

  const renderInstructions = () => {
    if ((editing || editMode) && instructions !== null) {
      return <div className={cssClassPrefix + "easy-edit-instructions"}>{instructions}</div>;
    }
  };

  const setCssClasses = (existingClasses) => {
    if (viewAttributes["class"]) {
      existingClasses += " " + viewAttributes["class"];
    }
    if (viewAttributes["className"]) {
      existingClasses += " " + viewAttributes["className"];
    }

    if (!allowEdit) {
      return cssClassPrefix + "easy-edit-not-allowed " + existingClasses;
    } else if (hover) {
      return onHoverCssClass === Globals.DEFAULT_ON_HOVER_CSS_CLASS
        ? cssClassPrefix + "easy-edit-hover-on " + existingClasses
        : onHoverCssClass + " " + existingClasses;
    } else {
      return existingClasses;
    }
  };

  const generateButton = (ref, onClick, label, cssClass, name, saveOnBlur) => {
    if (saveOnBlur) {
      return "";
    }
    return (
      <button ref={ref} onClick={onClick} className={cssClass} name={name}>
        {label}
      </button>
    );
  };

  const generateEditButton = (cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle) => {
    if (!showViewButtonsOnHover || (showViewButtonsOnHover && hover)) {
      return (
        !hideEditButton && (
          <div className={cssClassPrefix + "easy-edit-view-button-wrapper"}>
            {generateButton(editButton, handleEditing, editButtonLabel, manageButtonStyle(editButtonStyle), "edit")}
          </div>
        )
      );
    }
  };

  const renderComplexView = () => {
    const { placeholder, options, type } = props;

    if (isNullOrUndefinedOrEmpty(currentValue)) {
      return placeholder;
    }

    let selected;
    if (Types.CHECKBOX === type) {
      selected = options.filter((option) => {
        return currentValue.includes(option.value);
      });
    } else {
      selected = options.filter((option) => {
        return currentValue === option.value;
      });
    }

    if (selected.length !== 0) {
      return selected.map(checkbox => checkbox.label).join(", ");
    } else {
      return currentValue;
    }
  };

  const renderInput = (inputValue) => {
    return (
      <EasyInput
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
      />
    );
  };

  const renderTextarea = (inputValue) => {
    return (
      <EasyParagraph
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderSelect = (inputValue) => {
    return (
      <EasyDropdown
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        placeholder={placeholder === Globals.DEFAULT_PLACEHOLDER ? Globals.DEFAULT_SELECT_PLACEHOLDER : placeholder}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderRadio = (inputValue) => {
    return (
      <EasyRadio
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderCheckbox = (inputValue) => {
    return (
      <EasyCheckbox
        value={inputValue}
        onChange={handleCheckboxChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderDatalist = (inputValue) => {
    return (
      <EasyDatalist
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderColor = (inputValue) => {
    return (
      <EasyColor
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        attributes={attributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderPlaceholder = () => {
    const cssWrapperClass = cssClassPrefix + "easy-edit-wrapper";

    if (React.isValidElement(displayComponent)) {
      return (
        <div
          {...viewAttributes}
          className={setCssClasses(cssWrapperClass)}
          onClick={handleClick}
          onMouseEnter={handleHoverOn}
          onMouseLeave={handleHoverOff}
        >
          {!isNullOrUndefinedOrEmpty(currentValue)
            ? React.cloneElement(displayComponent, { value: currentValue })
            : placeholder}
          {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
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
        let passwordValue = type === Types.PASSWORD ? "••••••••" : currentValue;
        return (
          <div
            {...viewAttributes}
            className={setCssClasses(cssWrapperClass)}
            onClick={handleClick}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            {!isNullOrUndefinedOrEmpty(currentValue) ? passwordValue : placeholder}
            {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
          </div>
        );
      }
      case Types.RADIO:
      case Types.CHECKBOX:
      case Types.SELECT: {
        return (
          <div
            {...viewAttributes}
            className={setCssClasses(cssWrapperClass)}
            onClick={handleClick}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            {renderComplexView()}
            {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel, editButtonStyle)}
          </div>
        );
      }
      case Types.COLOR: {
        return (
          <input
            {...viewAttributes}
            type={type}
            value={currentValue}
            onClick={handleClick}
            readOnly
          />
        );
      }
      default: {
        throw new Error(Globals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  };

  return isHidden ? null : editing || editMode ? (
    <div
      className={cssClassPrefix + "easy-edit-inline-wrapper"}
      tabIndex="0"
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
      onKeyDown={handleKeyDown}
    >
      {buttonsPosition === Globals.POSITION_BEFORE && renderButtons()}
      {renderComponentView()}
      {buttonsPosition === Globals.POSITION_AFTER && renderButtons()}
      {renderInstructions()}
      {renderValidationMessage()}
    </div>
  ) : (
    renderPlaceholder()
  );
}

EasyEdit.propTypes = {
  type: PropTypes.oneOf([
    "checkbox",
    "color",
    "datalist",
    "date",
    "datetime-local",
    "email",
    "file",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "select",
    "tel",
    "text",
    "textarea",
    "time",
    "url",
    "week"
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  options: PropTypes.array,
  saveButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  saveButtonStyle: PropTypes.string,
  cancelButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelButtonStyle: PropTypes.string,
  deleteButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  deleteButtonStyle: PropTypes.string,
  editButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  editButtonStyle: PropTypes.string,
  buttonsPosition: PropTypes.oneOf(["after", "before"]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
  onCancel: () => {},
  onDelete: () => {},
  onBlur: () => {},
  onValidate: (value) => true,
  validationMessage: Globals.FAILED_VALIDATION_MESSAGE,
  attributes: {},
  viewAttributes: {},
  instructions: null,
  editComponent: null,
  disableAutoSubmit: false,
  disableAutoCancel: false,
  cssClassPrefix: "",
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
