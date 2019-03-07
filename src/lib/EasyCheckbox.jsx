import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyCheckbox = (props) => {
  let {options, value, onChange} = props;
  value = value || [];
  return (
      options.map(option => (
              <label key={option.value} className="easy-edit-checkbox-label">
                <input
                    type="checkbox"
                    className="easy-edit-radio-button"
                    value={option.value}
                    key={option.value}
                    onChange={onChange}
                    checked={value.includes(option.value)}
                />{option.label}
              </label>
          )
      ));
};

EasyCheckbox.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  disabled: PropTypes.bool
};

export default EasyCheckbox;
