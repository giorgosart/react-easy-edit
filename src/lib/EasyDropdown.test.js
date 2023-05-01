import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyDropdown from './EasyDropdown';
import Globals from "./globals";

describe('EasyDropdown', () => {
  const options = [
    { value: 'value1', label: 'Label 1' },
    { value: 'value2', label: 'Label 2' },
    { value: 'value3', label: 'Label 3' },
  ];

  it('renders with options and placeholder', () => {
    const { getByText } = render(
        <EasyDropdown options={options} placeholder="Select an option" />
    );

    expect(getByText('Select an option')).toBeInTheDocument();
    expect(getByText('Label 1')).toBeInTheDocument();
    expect(getByText('Label 2')).toBeInTheDocument();
    expect(getByText('Label 3')).toBeInTheDocument();
  });

  it('renders with value selected', () => {
    const { getByDisplayValue } = render(
        <EasyDropdown options={options} value="value2" />
    );

    expect(getByDisplayValue('Label 2')).toBeInTheDocument();
  });

  it('calls onChange when selecting an option', () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(
        <EasyDropdown options={options} onChange={handleChange} />
    );
    const selectElement = getByDisplayValue(Globals.DEFAULT_SELECT_PLACEHOLDER);

    fireEvent.change(selectElement, { target: { value: 'value2' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onFocus and onBlur when focus and blur on the select', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const { getByDisplayValue } = render(
        <EasyDropdown options={options} onFocus={handleFocus} onBlur={handleBlur} />
    );
    const selectElement = getByDisplayValue(Globals.DEFAULT_SELECT_PLACEHOLDER);

    fireEvent.focus(selectElement);
    fireEvent.blur(selectElement);

    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders with custom CSS class prefix', () => {
    const { container } = render(
        <EasyDropdown options={options} cssClassPrefix="custom-" />
    );

    expect(container.firstChild).toHaveClass('custom-easy-edit-component-wrapper');
  });

  it('renders with custom attributes', () => {
    const { getByDisplayValue } = render(
        <EasyDropdown options={options} attributes={{ id: 'dropdown' }} />
    );
    const selectElement = getByDisplayValue(Globals.DEFAULT_SELECT_PLACEHOLDER);

    expect(selectElement).toHaveAttribute('id', 'dropdown');
  });
});
