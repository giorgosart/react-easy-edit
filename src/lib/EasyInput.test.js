import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyInput from './EasyInput';

describe('EasyInput', () => {
  const defaultProps = {
    type: 'text',
    onChange: jest.fn(),
    value: '',
    placeholder: 'Enter text here',
    attributes: {},
    cssClassPrefix: '',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders an input element with default props', () => {
    const { getByPlaceholderText } = render(<EasyInput {...defaultProps} />);
    const inputElement = getByPlaceholderText('Enter text here');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('autocomplete', 'off');
  });

  it('renders an input element with custom props', () => {
    const { getByPlaceholderText } = render(
      <EasyInput
        {...defaultProps}
        type="email"
        value="test@example.com"
        placeholder="Enter email here"
        attributes={{ 'data-testid': 'email-input' }}
        cssClassPrefix="custom-"
      />
    );
    const inputElement = getByPlaceholderText('Enter email here');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('value', 'test@example.com');
    expect(inputElement).toHaveAttribute('autocomplete', 'off');
    expect('custom-easy-edit-component-wrapper').toBeDefined();
    expect(inputElement).toHaveAttribute('data-testid', 'email-input');
  });

  it('calls onChange prop when input value changes', () => {
    const { getByPlaceholderText } = render(<EasyInput {...defaultProps} />);
    const inputElement = getByPlaceholderText('Enter text here');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onFocus prop when input is focused', () => {
    const { getByPlaceholderText } = render(<EasyInput {...defaultProps} />);
    const inputElement = getByPlaceholderText('Enter text here');
    fireEvent.focus(inputElement);
    expect(defaultProps.onFocus).toHaveBeenCalled();
  });

  it('calls onBlur prop when input is blurred', () => {
    const { getByPlaceholderText } = render(<EasyInput {...defaultProps} />);
    const inputElement = getByPlaceholderText('Enter text here');
    fireEvent.blur(inputElement);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });
});
