import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyRadio = (props) => {
  const {options, value, onChange, attributes, instructions} = props;
  let radios = options.map(option => (
      <label key={option.value} className="easy-edit-radio-label">
        <input
            type="radio"
            className="easy-edit-radio-button"
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
        <div className="easy-edit-instructions">{instructions}</div>
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
  instructions: PropTypes.string
};

EasyRadio.defaultProps = {
  attributes: {},
  instructions: null
};

export default EasyRadio;
