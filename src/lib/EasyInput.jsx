import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from "./globals";

const EasyInput = (props) => {
  const {type, value, placeholder, onChange, attributes, cssClassPrefix, onBlur} = props;
  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        <input
            autoFocus={attributes["autoFocus"] || true}
            type={type}
            value={value ? value : undefined}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={attributes["placeholder"] || placeholder}
            autoComplete={attributes["autoComplete"] || "off"}
            {...attributes}
        />
      </div>
  );
};

EasyInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onBlur: PropTypes.func
};

EasyInput.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyInput;
