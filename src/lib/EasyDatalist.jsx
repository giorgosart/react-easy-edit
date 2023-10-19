import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

function EasyDatalist(props) {
  const {
    options, value, onChange, attributes, placeholder, cssClassPrefix, onFocus, onBlur
  } = props;
  const ref = React.createRef();
  const datalistOptions = options.map((dl) => (
    <option key={dl.value} value={dl.label} />
  ));

  return (
    <div className={`${cssClassPrefix}easy-edit-component-wrapper`}>
      <input
        autoFocus={attributes.autoFocus || true}
        value={value || undefined}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={attributes.autoComplete || 'off'}
        {...attributes}
        list={ref}
      />
      <datalist id={ref}>
        {datalistOptions}
      </datalist>
    </div>
  );
}

EasyDatalist.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

EasyDatalist.defaultProps = {
  attributes: {},
};

export default EasyDatalist;
