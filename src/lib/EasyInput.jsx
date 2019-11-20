import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from "./globals";

const EasyInput = (props) => {
  const {type, value, placeholder, onChange, attributes, cssClassPrefix} = props;
  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        <input
            autoFocus={attributes["autoFocus"] || true}
            type={type}
            value={value ? value : undefined}
            onChange={onChange}
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
  cssClassPrefix: PropTypes.string
};

EasyInput.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyInput;
