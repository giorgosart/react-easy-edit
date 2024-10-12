import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import EasyCustom from "./EasyCustom";
import PropTypes from 'prop-types';

const MockChildComponent = ({ value, onBlur, onFocus, setParentValue }) => (
  <input
    data-testid="child-input"
    value={value}
    onBlur={() => onBlur(value)}
    onFocus={onFocus}
    onChange={(e) => setParentValue(e.target.value)}
  />
);

MockChildComponent.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  setParentValue: PropTypes.func
};

describe('EasyCustom Component', () => {
  const onBlurMock = jest.fn();
  const onFocusMock = jest.fn();
  const setValueMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders child component and passes the correct props', () => {
    render(
      <EasyCustom
        cssClassPrefix="test-"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        setValue={setValueMock}
        value="Initial Value"
      >
        <MockChildComponent />
      </EasyCustom>
    );

    const inputElement = screen.getByTestId('child-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('Initial Value');
  });

  it('updates value when setParentValue is called', () => {
    render(
      <EasyCustom
        cssClassPrefix="test-"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        setValue={setValueMock}
        value="Initial Value"
      >
        <MockChildComponent />
      </EasyCustom>
    );

    const inputElement = screen.getByTestId('child-input');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(inputElement.value).toBe('New Value');
    expect(setValueMock).toHaveBeenCalledWith('New Value');
  });

  it('calls onBlur with the current value when input loses focus', () => {
    render(
      <EasyCustom
        cssClassPrefix="test-"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        setValue={setValueMock}
        value="Initial Value"
      >
        <MockChildComponent />
      </EasyCustom>
    );

    const inputElement = screen.getByTestId('child-input');
    fireEvent.blur(inputElement);

    expect(onBlurMock).toHaveBeenCalledWith('Initial Value');
  });

  it('calls onFocus when input gains focus', () => {
    render(
      <EasyCustom
        cssClassPrefix="test-"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        setValue={setValueMock}
        value="Initial Value"
      >
        <MockChildComponent />
      </EasyCustom>
    );

    const inputElement = screen.getByTestId('child-input');
    fireEvent.focus(inputElement);

    expect(onFocusMock).toHaveBeenCalled();
  });

  it('applies the correct CSS class prefix', () => {
    render(
      <EasyCustom
        cssClassPrefix="test-"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        setValue={setValueMock}
        value="Initial Value"
      >
        <MockChildComponent />
      </EasyCustom>
    );

    const wrapperElement = screen.getByTestId('child-input').closest('div');
    expect(wrapperElement).toHaveClass('test-easy-edit-component-wrapper');
  });
});
