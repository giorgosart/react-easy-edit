import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import EasyDatalist from "./EasyDatalist";

describe('EasyDatalist Component', () => {
  const mockOptions = [
    { value: 'Option 1' },
    { value: 'Option 2' },
    { value: 'Option 3' }
  ];

  const defaultProps = {
    options: mockOptions,
    value: '',
    onChange: jest.fn(),
    attributes: {},
    placeholder: 'Enter value',
    cssClassPrefix: 'test-',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  };

  test('renders input with placeholder', () => {
    render(<EasyDatalist {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter value');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders all options in the datalist', () => {
    render(<EasyDatalist {...defaultProps} />);
    const datalistElement = document.getElementById('easy-datalist-id');
    mockOptions.forEach(option => {
      expect(datalistElement).toContainHTML(`<option value="${option.value}"></option>`);
    });
  });

  test('calls onChange when input value changes', () => {
    render(<EasyDatalist {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter value');
    fireEvent.change(inputElement, { target: { value: 'Option 1' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('calls onFocus when input is focused', () => {
    render(<EasyDatalist {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter value');
    fireEvent.focus(inputElement);
    expect(defaultProps.onFocus).toHaveBeenCalled();
  });

  test('calls onBlur when input is blurred', () => {
    render(<EasyDatalist {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter value');
    fireEvent.blur(inputElement);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test('renders with default class prefix', () => {
    render(<EasyDatalist {...defaultProps} />);
    const wrapper = screen.getByPlaceholderText('Enter value').parentElement;
    expect(wrapper).toHaveClass('test-easy-edit-component-wrapper');
  });

  test('sets the input value correctly', () => {
    render(<EasyDatalist {...defaultProps} value="Option 2" />);
    const inputElement = screen.getByDisplayValue('Option 2');
    expect(inputElement).toBeInTheDocument();
  });
});
