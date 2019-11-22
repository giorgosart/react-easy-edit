import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';
import Globals from './globals'

const EasyParagraph = (props) => {
  const {value, placeholder, onChange, attributes, cssClassPrefix} = props;
  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        <textarea
            autoFocus={attributes["autoFocus"] || true}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...attributes}
            className={attributes["className"] + " easy-edit-textarea" || "easy-edit-textarea"}
        />
      </div>);
};

EasyParagraph.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string
};

EasyParagraph.defaultProps = {
  attributes: {},
  placeholder: Globals.DEFAULT_PLACEHOLDER
};

export default EasyParagraph;
