import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyDropdown from './EasyDropdown';
import Globals from './globals';

describe('EasyDropdown Component', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders with default placeholder', () => {
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={() => {}}
        cssClassPrefix="test-"
      />
    );

    expect(screen.getByText(Globals.DEFAULT_SELECT_PLACEHOLDER)).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const placeholder = 'Select an option';
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={() => {}}
        placeholder={placeholder}
        cssClassPrefix="test-"
      />
    );

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('renders all options correctly', () => {
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={() => {}}
        cssClassPrefix="test-"
      />
    );

    defaultOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange handler when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={handleChange}
        cssClassPrefix="test-"
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option1' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays the correct value when an option is selected', () => {
    render(
      <EasyDropdown
        options={defaultOptions}
        value="option1"
        onChange={() => {}}
        cssClassPrefix="test-"
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('option1');
  });

  it('calls onFocus handler when focused', () => {
    const handleFocus = jest.fn();
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={() => {}}
        onFocus={handleFocus}
        cssClassPrefix="test-"
      />
    );

    fireEvent.focus(screen.getByRole('combobox'));
    expect(handleFocus).toHaveBeenCalled();
  });

  it('calls onBlur handler when focus is lost', () => {
    const handleBlur = jest.fn();
    render(
      <EasyDropdown
        options={defaultOptions}
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
        cssClassPrefix="test-"
      />
    );

    fireEvent.blur(screen.getByRole('combobox'));
    expect(handleBlur).toHaveBeenCalled();
  });
});
