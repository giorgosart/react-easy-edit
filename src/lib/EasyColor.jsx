import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyColor = (props) => {
  const {value = '', onChange, attributes} = props;
  return (
      <input
          type="color"
          defaultValue={value}
          onChange={onChange}
          {...attributes}
      />
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
