import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyDatalist from './EasyDatalist';

describe('EasyDatalist', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  const onChange = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const placeholder = 'Enter a value';

  it('renders with options and placeholder', () => {
    const { getByPlaceholderText } = render(
      <EasyDatalist
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('updates value on change', () => {
    const { getByPlaceholderText } = render(
      <EasyDatalist options={options} onChange={onChange} placeholder={placeholder} />
    );
    const input = getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'Option 1' } });

    expect(input.value).toBe('Option 1');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies custom css class prefix', () => {
    const cssClassPrefix = 'custom-prefix-';
    const { container } = render(
      <EasyDatalist
        options={options}
        onChange={onChange}
        cssClassPrefix={cssClassPrefix}
      />
    );
    expect(container.firstChild).toHaveClass(
      `${cssClassPrefix}easy-edit-component-wrapper`
    );
  });
});
