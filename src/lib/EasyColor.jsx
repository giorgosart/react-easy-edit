import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from "./globals";

const EasyColor = (props) => {
  const {name, value, onChange} = props;

  return (
      <input
          name={name}
          type="color"
          defaultValue={value}
          onChange={onChange}
      />
  );
};

EasyColor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default EasyColor;
