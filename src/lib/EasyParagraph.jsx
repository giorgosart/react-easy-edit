import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals'

const EasyParagraph = (props) => {
  const {value, placeholder, onChange, attributes} = props;

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
      </div>);
};

EasyParagraph.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  attributes: PropTypes.object
};

EasyParagraph.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyParagraph;
