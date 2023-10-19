import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyParagraph from './EasyParagraph';
import Globals from './globals';

describe('EasyParagraph', () => {
  test('renders a textarea with default placeholder', () => {
    const { getByPlaceholderText } = render(<EasyParagraph />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toBeInTheDocument();
  });

  test('renders a textarea with custom placeholder', () => {
    const { getByPlaceholderText } = render(<EasyParagraph placeholder="Custom placeholder" />);
    expect(getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  test('renders a textarea with custom CSS class', () => {
    const { getByPlaceholderText } = render(<EasyParagraph attributes={{ className: 'custom-class' }} />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toHaveClass('custom-class');
  });

  test('calls onChange handler when user types in textarea', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<EasyParagraph onChange={handleChange} />);
    fireEvent.change(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('calls onBlur handler when user leaves textarea', () => {
    const handleBlur = jest.fn();
    const { getByPlaceholderText } = render(<EasyParagraph onBlur={handleBlur} />);
    fireEvent.blur(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER));
    expect(handleBlur).toHaveBeenCalled();
  });

  test('calls onFocus handler when user focuses on textarea', () => {
    const handleFocus = jest.fn();
    const { getByPlaceholderText } = render(<EasyParagraph onFocus={handleFocus} />);
    fireEvent.focus(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER));
    expect(handleFocus).toHaveBeenCalled();
  });

  test('renders a textarea with default value', () => {
    const { getByPlaceholderText } = render(<EasyParagraph />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toHaveValue('');
  });

  test('renders a textarea with initial value', () => {
    const { getByPlaceholderText } = render(<EasyParagraph value="Initial value" />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toHaveValue('Initial value');
  });

  test('autoFocus attribute sets focus on textarea', () => {
    const { getByPlaceholderText } = render(<EasyParagraph attributes={{ autoFocus: true }} />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toHaveFocus();
  });

  test('cssClassPrefix prop is applied to the wrapper div', () => {
    const { getByPlaceholderText } = render(<EasyParagraph cssClassPrefix="custom-prefix-" />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER).closest('div')).toHaveClass('custom-prefix-easy-edit-component-wrapper');
  });

  test('attributes prop is applied to the textarea', () => {
    const { getByPlaceholderText } = render(<EasyParagraph attributes={{ id: 'test-id', disabled: true }} />);
    expect(getByPlaceholderText(Globals.DEFAULT_PLACEHOLDER)).toHaveAttribute('id', 'test-id');
  });
});
