import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyDatalist = (props) => {
  const {options, value, onChange, attributes, placeholder} = props;
  const ref = React.createRef();
  let datalistOptions = options.map(dl => (
      <option value={dl.label}/>
  ));

  return (
      <div className="easy-edit-component-wrapper">
        <input
            autoFocus={attributes["autoFocus"] || true}
            value={value}
            onChange={onChange}
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
  attributes: PropTypes.object
};

EasyDatalist.defaultProps = {
  attributes: {}
};

export default EasyDatalist;
