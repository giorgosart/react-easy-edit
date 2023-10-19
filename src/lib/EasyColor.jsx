import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

function EasyColor(props) {
  const {
    value = '', onChange, attributes, cssClassPrefix, onFocus, onBlur
  } = props;
  return (
    <div className={`${cssClassPrefix}easy-edit-component-wrapper`}>
      <input
        type="color"
        defaultValue={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...attributes}
      />
    </div>
  );
}

EasyColor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

EasyColor.defaultProps = {
  attributes: {}
};

export default EasyColor;
