import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

function EasyRadio(props) {
  const {
    options, value, onChange, attributes, cssClassPrefix, onFocus, onBlur
  } = props;
  const radios = options.map((option) => (
    <label key={option.value} className={`${cssClassPrefix}easy-edit-radio-label`}>
      <input
        type="radio"
        value={option.value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={option.value === value}
        {...attributes}
      />
      {option.label}
    </label>
  ));
  return (
    <div>
      {radios}
    </div>
  );
}

EasyRadio.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

EasyRadio.defaultProps = { attributes: {}, };

export default EasyRadio;
