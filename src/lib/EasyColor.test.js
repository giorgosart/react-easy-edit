import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import EasyColor from "./EasyColor";

describe("EasyColor component", () => {
  it("should render the component with default value", () => {
    render(<EasyColor value="#ff0000" cssClassPrefix="test-" />);
    const inputElement = screen.getByDisplayValue("#ff0000");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "color");
  });

  it("should apply cssClassPrefix to wrapper div", () => {
    const { container } = render(<EasyColor cssClassPrefix="test-" />);
    expect(container.firstChild).toHaveClass("test-easy-edit-component-wrapper");
  });

  it("should call onChange when color value changes", () => {
    const handleChange = jest.fn();
    render(<EasyColor value="#ff0000" onChange={handleChange} />);
    const inputElement = screen.getByDisplayValue("#ff0000");

    fireEvent.change(inputElement, { target: { value: "#00ff00" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should call onFocus when input is focused", () => {
    const handleFocus = jest.fn();
    render(<EasyColor value="#ff0000" onFocus={handleFocus} />);
    const inputElement = screen.getByDisplayValue("#ff0000");

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input loses focus", () => {
    const handleBlur = jest.fn();
    render(<EasyColor value="#ff0000" onBlur={handleBlur} />);
    const inputElement = screen.getByDisplayValue("#ff0000");

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("should pass additional attributes to input element", () => {
    render(<EasyColor value="#ff0000" attributes={{ "data-testid": "color-input" }} />);
    const inputElement = screen.getByTestId("color-input");
    expect(inputElement).toBeInTheDocument();
  });
});
