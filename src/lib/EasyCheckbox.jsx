import React from 'react';
import PropTypes from 'prop-types';
import './EasyEdit.css';

const EasyCheckbox = (props) => {
  let {options, value, onChange, attributes, cssClassPrefix} = props;
  value = value || [];
  let checkboxes = options.map(option => (
          <label key={option.value} className={cssClassPrefix + "easy-edit-checkbox-label"}>
            <input
                {...attributes}
                type="checkbox"
                value={option.value}
                key={option.value}
                onChange={onChange}
                checked={value.includes(option.value)}
            />{option.label}
          </label>
      )
  );
  return (
      <div>
        {checkboxes}
      </div>
  );
};

EasyCheckbox.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  attributes: PropTypes.object,
  cssClassPrefix: PropTypes.string
};

EasyCheckbox.defaultProps = {
  attributes: {}
};

export default EasyCheckbox;
