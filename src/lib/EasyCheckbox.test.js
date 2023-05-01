import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyCheckbox from "./EasyCheckbox";

describe('EasyCheckbox', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders checkboxes with labels', () => {
    const { getByLabelText } = render(<EasyCheckbox options={options} />);

    options.forEach(option => {
      const checkbox = getByLabelText(option.label);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveAttribute('value', option.value);
    });
  });

  it('renders checked checkboxes', () => {
    const value = ['option1', 'option3'];
    const { getByLabelText } = render(<EasyCheckbox options={options} value={value} />);

    options.forEach(option => {
      const checkbox = getByLabelText(option.label);
      if (value.includes(option.value)) {
        expect(checkbox).toBeChecked();
      } else {
        expect(checkbox).not.toBeChecked();
      }
    });
  });

  it('calls onChange handler when a checkbox is clicked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<EasyCheckbox options={options} onChange={onChange} />);

    const checkbox = getByLabelText('Option 1');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({target: expect.objectContaining({value: 'option1'})}));
  });

  it('calls onFocus and onBlur handlers when a checkbox is focused and blurred', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByLabelText } = render(<EasyCheckbox options={options} onFocus={onFocus} onBlur={onBlur} />);

    const checkbox = getByLabelText('Option 1');
    fireEvent.focus(checkbox);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(checkbox);
    expect(onBlur).toHaveBeenCalled();
  });
});
