import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyCheckbox = (props) => {
  const {options, value, onChange} = props;
  return (
      options.map(option => (
              <label className="easy-edit-checkbox-label">
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
  value: PropTypes.array
};

export default EasyCheckbox;
