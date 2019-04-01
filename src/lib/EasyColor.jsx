import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyColor = (props) => {
  const {value = '', onChange, attributes, instructions} = props;
  return (
      <div className="easy-edit-component-wrapper">
        <input
            type="color"
            defaultValue={value}
            onChange={onChange}
            {...attributes}
        />
        <span className="easy-edit-instructions">{instructions}</span>
      </div>
  );
};

EasyColor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  attributes: PropTypes.object,
  instructions: PropTypes.string
};

EasyColor.defaultProps = {
  attributes: {},
  instructions: null
};

export default EasyColor;
