import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals'

const EasyParagraph = (props) => {
  const {value, placeholder, onChange, attributes, instructions} = props;

  return (
      <div className="easy-edit-component-wrapper">
        <textarea
            autoFocus={attributes["autoFocus"] || true}
            className="easy-edit-textarea"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...attributes}
        />
        <span className="easy-edit-instructions">{instructions}</span>
      </div>);
};

EasyParagraph.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  attributes: PropTypes.object,
  instructions: PropTypes.string
};

EasyParagraph.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER,
  instructions: null
};

export default EasyParagraph;
