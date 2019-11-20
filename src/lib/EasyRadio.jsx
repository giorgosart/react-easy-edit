import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyRadio = (props) => {
  const {options, value, onChange, attributes, cssClassPrefix} = props;
  let radios = options.map(option => (
      <label key={option.value} className={cssClassPrefix + "easy-edit-radio-label"}>
        <input
            type="radio"
            value={option.value}
            onChange={onChange}
            checked={option.value === value}
            {...attributes}
        />{option.label}
      </label>
  ));
  return (
      <div>
        {radios}
      </div>
  );
};

EasyRadio.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string
};

EasyRadio.defaultProps = {
  attributes: {}
};

export default EasyRadio;
