import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyColor = (props) => {
  const {name, value = '', onChange, disabled} = props;
  return (
      <input
          name={name}
          type="color"
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
      />
  );
};

EasyColor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool
};

export default EasyColor;
