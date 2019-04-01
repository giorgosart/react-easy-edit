import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from "./globals";

const EasyInput = (props) => {
  const {type, value, placeholder, onChange, attributes, instructions} = props;
  return (
      <div className="easy-edit-component-wrapper">
        <input
            autoFocus={attributes["autoFocus"] || true}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={attributes["autoComplete"] || "off"}
            {...attributes}
        />
        <span className="easy-edit-instructions">{instructions}</span>
      </div>
  );
};

EasyInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  attributes: PropTypes.object,
  instructions: PropTypes.string
};

EasyInput.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER,
  instructions: null
};

export default EasyInput;
