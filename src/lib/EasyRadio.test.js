import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyRadio from './EasyRadio';

describe('EasyRadio Component', () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders all radio options correctly', () => {
    render(<EasyRadio options={options} value={''} onChange={mockOnChange} />);

    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('checks the correct radio option based on value prop', () => {
    render(<EasyRadio options={options} value={'option2'} onChange={mockOnChange} />);

    const selectedOption = screen.getByLabelText('Option 2');
    expect(selectedOption).toBeChecked();
  });

  it('calls onChange when a radio option is selected', () => {
    render(<EasyRadio options={options} value={''} onChange={mockOnChange} />);

    const optionToSelect = screen.getByLabelText('Option 1');
    fireEvent.click(optionToSelect);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onFocus when a radio option is focused', () => {
    render(
      <EasyRadio
        options={options}
        value={''}
        onChange={mockOnChange}
        onFocus={mockOnFocus}
      />
    );

    const optionToFocus = screen.getByLabelText('Option 1');
    fireEvent.focus(optionToFocus);

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when a radio option loses focus', () => {
    render(
      <EasyRadio
        options={options}
        value={''}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const optionToBlur = screen.getByLabelText('Option 1');
    fireEvent.blur(optionToBlur);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('applies cssClassPrefix to radio labels', () => {
    const cssClassPrefix = 'custom-';
    render(<EasyRadio options={options} value={''} onChange={mockOnChange} cssClassPrefix={cssClassPrefix} />);

    options.forEach(option => {
      expect(screen.getByLabelText(option.label).parentElement).toHaveClass(`${cssClassPrefix}easy-edit-radio-label`);
    });
  });
});
