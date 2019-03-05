import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals'

const EasyParagraph = (props) => {
  const {name, value, placeholder, onChange, disabled} = props;

  return (
      <textarea
          className="easy-edit-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
      />);
};

EasyParagraph.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

EasyParagraph.defaultProps = {
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyParagraph;
