import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyParagraph from './EasyParagraph';
import Globals from './globals';

describe('EasyParagraph Component', () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    render(<EasyParagraph value="Test Value" onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Test Value');
  });

  it('displays the correct placeholder when provided', () => {
    render(
      <EasyParagraph
        value=""
        placeholder="Enter text here"
        onChange={mockOnChange}
      />
    );
    const textarea = screen.getByPlaceholderText('Enter text here');
    expect(textarea).toBeInTheDocument();
  });

  it('uses the default placeholder if no placeholder is provided', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} />);
    const textarea = screen.getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER);
    expect(textarea).toBeInTheDocument();
  });

  it('triggers onChange callback when text is changed', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('triggers onFocus callback when focused', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} onFocus={mockOnFocus} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    expect(mockOnFocus).toHaveBeenCalledTimes(2);
  });

  it('triggers onBlur callback when focus is lost', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} onBlur={mockOnBlur} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.blur(textarea);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with the provided CSS class prefix', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} cssClassPrefix="custom-" />);
    const wrapper = screen.getByRole('textbox').closest('div');
    expect(wrapper).toHaveClass('custom-easy-edit-component-wrapper');
  });

  it('applies additional attributes to the textarea', () => {
    render(<EasyParagraph value="" onChange={mockOnChange} attributes={{ maxLength: 50 }} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '50');
  });
});
