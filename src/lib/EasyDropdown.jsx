import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals';

const EasyDropdown = (props) => {
  const {options, value, onChange, placeholder, attributes, instructions} = props;

  return (
      <div className="easy-edit-component-wrapper">
        <select
            value={value || ''}
            onChange={onChange}
            {...attributes}
        >
          <option key="" value="" disabled="disabled">{placeholder}</option>
          {options.map(option => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
          ))}
        </select>
      </div>
  );
};

EasyDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  attributes: PropTypes.object
};

EasyDropdown.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_SELECT_PLACEHOLDER
};

export default EasyDropdown;
