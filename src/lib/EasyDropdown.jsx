import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyDropdown = (props) => {
  const {name, options, value, onChange} = props;

  return (
      <select
          value={value || ''}
          onChange={onChange}
          name={name}
      >
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
  ])
};

export default EasyDropdown;
