import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyRadio from './EasyRadio';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('EasyRadio', () => {
  test('renders radio buttons with options', () => {
    const { getByLabelText } = render(
        <EasyRadio options={options} value="1" onChange={() => {}} />
    );
    const option1 = getByLabelText('Option 1');
    const option2 = getByLabelText('Option 2');
    const option3 = getByLabelText('Option 3');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  test('sets checked attribute for selected option', () => {
    const { getByLabelText } = render(
        <EasyRadio options={options} value="1" onChange={() => {}} />
    );
    const option1 = getByLabelText('Option 1');
    expect(option1).toBeChecked();
  });

  test('calls onChange callback when option is selected', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
        <EasyRadio options={options} value="1" onChange={onChange} />
    );
    const option2 = getByLabelText('Option 2');
    fireEvent.click(option2);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    expect(onChange.mock.calls[0][0].target.value).toBe('2');
  });

  test('calls onFocus callback when radio button is focused', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
        <EasyRadio options={options} value="1" onChange={() => {}} onFocus={onFocus} />
    );
    const option1 = getByLabelText('Option 1');
    fireEvent.focus(option1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('calls onBlur callback when radio button is blurred', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
        <EasyRadio options={options} value="1" onChange={() => {}} onBlur={onBlur} />
    );
    const option1 = getByLabelText('Option 1');
    fireEvent.blur(option1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders radio buttons with custom CSS class names when cssClassPrefix prop is provided', () => {
    const { container } = render(<EasyRadio options={options} cssClassPrefix="my-prefix-" />);
    const radioLabels = container.querySelectorAll('.my-prefix-easy-edit-radio-label');
    expect(radioLabels).toHaveLength(3);
  });

  it('spreads additional attributes onto radio buttons when attributes prop is provided', () => {
    const { container } = render(<EasyRadio options={options} attributes={{ 'data-testid': 'my-radio' }} />);
    const radioButtons = container.querySelectorAll('input[type="radio"]');
    expect(radioButtons[0]).toHaveAttribute('data-testid', 'my-radio');
    expect(radioButtons[1]).toHaveAttribute('data-testid', 'my-radio');
    expect(radioButtons[2]).toHaveAttribute('data-testid', 'my-radio');
  });

  it('does not throw an error when value prop is null or undefined', () => {
    const { container } = render(<EasyRadio options={options} value={null} />);
    expect(container.firstChild).toBeDefined();

    const { container: container2 } = render(<EasyRadio options={options} value={undefined} />);
    expect(container2.firstChild).toBeDefined();
  });

  it('does not throw an error when onChange prop is not provided', () => {
    const { container } = render(<EasyRadio options={options} />);
    expect(container.firstChild).toBeDefined();
  });

  it('does not throw an error when onFocus or onBlur props are not provided', () => {
    const { container } = render(<EasyRadio options={options} />);
    const radioButtons = container.querySelectorAll('input[type="radio"]');

    fireEvent.focus(radioButtons[0]);
    expect(container.firstChild).toBeDefined();

    fireEvent.blur(radioButtons[0]);
    expect(container.firstChild).toBeDefined();
  });
});
