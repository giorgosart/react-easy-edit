import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyDatalist = (props) => {
  const { options, value, onChange, attributes, placeholder, cssClassPrefix, onFocus, onBlur } = props;

  const datalistId = 'easy-datalist-id';

  let datalistOptions = options.map(dl => (
    <option key={dl.value} value={dl.value} />
  ));

  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      <input
        autoFocus={attributes["autoFocus"] || true}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={attributes["autoComplete"] || "off"}
        {...attributes}
        list={datalistId} // Set list attribute to the unique ID
      />
      <datalist id={datalistId}> {/* Assign the unique ID to the datalist */}
        {datalistOptions}
      </datalist>
    </div>
  );
};

EasyDatalist.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

EasyDatalist.defaultProps = {
  attributes: {}
};

export default EasyDatalist;
