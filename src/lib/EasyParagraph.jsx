import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals'

const EasyParagraph = (props) => {
  const {name, value, placeholder, onChange} = props;

  return (
      <textarea
          className="easy-edit-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
      />);
};

EasyParagraph.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

EasyParagraph.defaultProps = {
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyParagraph;
