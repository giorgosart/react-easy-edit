import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyColor = (props) => {
  const {value = '', onChange, attributes} = props;
  return (
      <div className="easy-edit-component-wrapper">
        <input
            type="color"
            defaultValue={value}
            onChange={onChange}
            {...attributes}
        />
      </div>
  );
};

EasyColor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  attributes: PropTypes.object
};

EasyColor.defaultProps = {
  attributes: {}
};

export default EasyColor;
