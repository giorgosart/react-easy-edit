import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyInput from './EasyInput';
import Globals from './globals';
import EasyEdit, { Types } from "./EasyEdit";

describe('EasyInput Component', () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  it('should render with default props', () => {
    render(<EasyInput type="text" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', Globals.DEFAULT_PLACEHOLDER);
    expect(inputElement).toHaveAttribute('autocomplete', 'off');
  });

  it('should render with provided value', () => {
    render(<EasyInput type="text" value="Hello" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveValue('Hello');
  });

  it('should call onChange when input value changes', () => {
    render(<EasyInput type="text" onChange={mockOnChange} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should call onFocus when input is focused', () => {
    render(<EasyInput type="text" onFocus={mockOnFocus} />);
    const inputElement = screen.getByRole('textbox');

    mockOnFocus.mockClear();
    fireEvent.focus(inputElement);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onBlur when input loses focus', () => {
    render(<EasyInput type="text" onBlur={mockOnBlur} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.blur(inputElement);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('should apply custom attributes', () => {
    render(
      <EasyInput
        type="text"
        attributes={{ autoComplete: 'on', placeholder: 'Enter text', autoFocus: false }}
      />
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('autocomplete', 'on');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
    expect(inputElement).not.toHaveAttribute('autofocus');
  });

  it('should apply css class prefix', () => {
    render(<EasyInput type="text" cssClassPrefix="custom-" />);
    const wrapperElement = screen.getByRole('textbox').closest('div');

    expect(wrapperElement).toHaveClass('custom-easy-edit-component-wrapper');
  });

  it("#53 should accept `password` as a valid type", () => {
    const saveFn = jest.fn();
    const { getByText } = render(
      <EasyEdit
        type={Types.PASSWORD}
        onSave={saveFn}
        inputAttributes={{name: 'password-test'}}
        value="password"
      />
    );

    expect(getByText('••••••••')).toBeInTheDocument();
  });

});
