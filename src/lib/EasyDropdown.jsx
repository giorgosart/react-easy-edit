import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals';

const EasyDropdown = (props) => {
  const {name, options, value, onChange, placeholder} = props;

  return (
      <select
          value={value || ''}
          onChange={onChange}
          name={name}
      >
        <option key="" value="" disabled="disabled">{placeholder}</option>
        {options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
        ))}
      </select>
  );
};

EasyDropdown.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string
};

EasyDropdown.defaultProps ={
  placeholder: Globals.DEFAULT_SELECT_PLACEHOLDER
};

export default EasyDropdown;
