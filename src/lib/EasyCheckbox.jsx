import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

function EasyCheckbox(props) {
  const {
    options, onChange, attributes, cssClassPrefix, onFocus, onBlur
  } = props;
  let { value } = props;
  value = value || [];
  const checkboxes = options.map((option) => (
    <label key={option.value} className={`${cssClassPrefix}easy-edit-checkbox-label`}>
      <input
        {...attributes}
        type="checkbox"
        value={option.value}
        key={option.value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={value.includes(option.value)}
      />
      {option.label}
    </label>
  ));
  return (
    <div>
      {checkboxes}
    </div>
  );
}

EasyCheckbox.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

EasyCheckbox.defaultProps = { attributes: {} };

export default EasyCheckbox;
