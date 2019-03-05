import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyRadio = (props) => {
  const {options, value, onChange} = props;
  return options.map(option => (
      <label key={option.value} className="easy-edit-radio-label">
        <input
            type="radio"
            className="easy-edit-radio-button"
            value={option.value}
            onChange={onChange}
            checked={option.value === value}
        />{option.label}
      </label>
  ));
};

EasyRadio.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default EasyRadio;
