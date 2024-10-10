import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EasyCustom = ({ children, cssClassPrefix, onBlur, onFocus, setValue, value: initialValue }) => {
  const [value, setValueState] = useState(initialValue);

  useEffect(() => {
    setValueState(initialValue);
  }, [initialValue]);

  const handleSetValue = (newValue) => {
    setValueState(newValue);
    setValue(newValue);
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
  setValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
};

export default EasyCustom;
