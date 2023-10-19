import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyCustom from './EasyCustom';

describe('EasyCustom', () => {
  test('renders the child component', () => {
    const { getByTestId } = render(
      <EasyCustom cssClassPrefix="test">
        <input data-testid="child-component" />
      </EasyCustom>
    );

    expect(getByTestId('child-component')).toBeInTheDocument();
  });

  test('calls onBlur on input blur', () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(
      <EasyCustom cssClassPrefix="test" onBlur={onBlur} value="">
        <input data-testid="child-component" />
      </EasyCustom>
    );
    const input = getByTestId('child-component');
    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  test('calls onFocus on input focus', () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(
      <EasyCustom cssClassPrefix="test" onFocus={onFocus} value="">
        <input data-testid="child-component" />
      </EasyCustom>
    );
    const input = getByTestId('child-component');
    fireEvent.focus(input);

    expect(onFocus).toHaveBeenCalled();
  });

  test('passes props to child component', () => {
    const { getByTestId } = render(
      <EasyCustom cssClassPrefix="test" value="">
        <input data-testid="child-component" data-testprop="test" />
      </EasyCustom>
    );
    const input = getByTestId('child-component');

    expect(input).toHaveAttribute('data-testprop', 'test');
  });

  test('renders with cssClassPrefix as wrapper div class name', () => {
    const { container } = render(
      <EasyCustom cssClassPrefix="test" value="">
        <input data-testid="child-component" />
      </EasyCustom>
    );

    expect(container.firstChild).toHaveClass('testeasy-edit-component-wrapper');
  });

  test('renders with the initial value', () => {
    const { getByTestId } = render(
      <EasyCustom cssClassPrefix="test" value="initial">
        <input data-testid="child-component" />
      </EasyCustom>
    );
    const input = getByTestId('child-component');

    expect(input).toHaveValue('initial');
  });
});
