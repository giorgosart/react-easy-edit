import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from "./globals";

const EasyInput = (props) => {
  const {name, type, value, placeholder, onChange, min, max} = props;

  return (
      <input
          name={name}
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
      />
  );
};

EasyInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]
  ),
  max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]
  )
};

EasyInput.defaultProps = {
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyInput;
