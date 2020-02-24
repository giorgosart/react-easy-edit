import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyDatalist = (props) => {
  const {options, value, onChange, attributes, placeholder, cssClassPrefix, onBlur} = props;
  const ref = React.createRef();
  let datalistOptions = options.map(dl => (
      <option key={dl.value} value={dl.label}/>
  ));

  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
        <input
            autoFocus={attributes["autoFocus"] || true}
            value={value ? value : undefined}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={attributes["autoComplete"] || "off"}
            {...attributes}
            list={ref}
        />
        <datalist id={ref}>
          {datalistOptions}
        </datalist>
      </div>
  );
};

EasyDatalist.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string,
  onBlur: PropTypes.func
};

EasyDatalist.defaultProps = {
  attributes: {}
};

export default EasyDatalist;
