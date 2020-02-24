import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyColor = (props) => {
  const {value = '', onChange, attributes, cssClassPrefix, onBlur} = props;
  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        <input
            type="color"
            defaultValue={value}
            onChange={onChange}
            onBlur={onBlur}
            {...attributes}
        />
      </div>
  );
};

EasyColor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onBlur: PropTypes.func
};

EasyColor.defaultProps = {
  attributes: {}
};

export default EasyColor;
