import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EasyCustom = ({ children, cssClassPrefix, onBlur, onFocus, onSetValue, value: initialValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSetValue = (newValue) => {
    setValue(newValue);
    onSetValue(newValue);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  const handleFocus = () => {
    onFocus();
  };

  const child = React.cloneElement(
    React.Children.only(children),
    {
      setParentValue: handleSetValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      value
    }
  );

  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      {child}
    </div>
  );
};

EasyCustom.propTypes = {
  children: PropTypes.element,
  cssClassPrefix: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSetValue: PropTypes.func, // Renamed from setValue to onSetValue in propTypes
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
};

export default EasyCustom;
