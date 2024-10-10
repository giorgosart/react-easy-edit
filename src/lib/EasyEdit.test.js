import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EasyEdit, { Types } from "./EasyEdit";
import Globals from "./globals";

describe("EasyEdit Component", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnValidate = jest.fn(() => true);
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input component correctly in edit mode", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        editMode={true}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSave when save button is clicked", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        saveButtonLabel="Save"
        editMode={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Initial Value"), {
      target: { value: "New Value" }
    });
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith("New Value");
  });

  test("calls onCancel when cancel button is clicked", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        cancelButtonLabel="Cancel"
        editMode={true}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("renders placeholder text when not in edit mode and no value is present",
    () => {
      render(
        <EasyEdit
          type={Types.TEXT}
          value=""
          onSave={mockOnSave}
          placeholder="Click to edit"
        />
      );

      expect(screen.getByText("Click to edit")).toBeInTheDocument();
    });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onDelete={mockOnDelete}
        deleteButtonLabel="Delete"
        hideDeleteButton={false}
        editMode={true}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test("does not save when validation fails", () => {
    mockOnValidate.mockImplementation(() => false);
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onValidate={mockOnValidate}
        saveButtonLabel="Save"
        editMode={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Initial Value"), {
      target: { value: "Invalid Value" }
    });
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test("calls onBlur when input is blurred", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onBlur={mockOnBlur}
        editMode={true}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");
    fireEvent.blur(inputElement);

    expect(mockOnBlur).toHaveBeenCalledWith("Initial Value");
  });

  test("calls onFocus when input is focused", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onFocus={mockOnFocus}
        editMode={true}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");
    fireEvent.focus(inputElement);

    expect(mockOnFocus).toHaveBeenCalledWith("Initial Value");
  });

  test("renders validation message when validation fails", () => {
    mockOnValidate.mockImplementation(() => false);
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onValidate={mockOnValidate}
        validationMessage="Invalid input"
        saveButtonLabel="Save"
        editMode={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Initial Value"), {
      target: { value: "Invalid Value" }
    });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });

  test("does not render delete button when hideDeleteButton is true", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        hideDeleteButton={true}
        deleteButtonLabel="Delete"
        editMode={true}
      />
    );

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  test("calls handleCancel when Escape key is pressed", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        disableAutoCancel={false}
        editMode={true}
      />
    );

    fireEvent.keyDown(screen.getByDisplayValue("Initial Value"), {
      keyCode: 27
    });

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("calls handleSave when Enter key is pressed", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        disableAutoSubmit={false}
        editMode={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Initial Value"), {
      target: { value: "New Value" }
    });
    fireEvent.keyDown(screen.getByDisplayValue("New Value"), {
      keyCode: 13
    });

    expect(mockOnSave).toHaveBeenCalledWith("New Value");
  });

  test("calls handleSave when Ctrl + Enter is pressed for textarea", () => {
    render(
      <EasyEdit
        type={Types.TEXTAREA}
        value="Initial Value"
        onSave={mockOnSave}
        disableAutoSubmit={false}
        editMode={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Initial Value"), {
      target: { value: "New Value" }
    });
    fireEvent.keyDown(screen.getByDisplayValue("New Value"), {
      keyCode: 13,
      ctrlKey: true
    });

    expect(mockOnSave).toHaveBeenCalledWith("New Value");
  });

  test("warns when both saveOnBlur and cancelOnBlur are true", () => {
    console.warn = jest.fn();
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        saveOnBlur={true}
        cancelOnBlur={true}
        editMode={true}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");
    fireEvent.blur(inputElement);

    expect(console.warn).toHaveBeenCalledWith(
      "EasyEdit: You've set both `saveOnBlur` and `cancelOnBlur` to true, please set either one to false."
    );
  });

  test("calls handleSave when saveOnBlur is true and input is blurred", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onBlur={mockOnBlur}
        saveOnBlur={true}
        editMode={true}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");
    fireEvent.change(inputElement, {
      target: { value: "New Value" }
    });
    fireEvent.blur(inputElement);

    expect(mockOnBlur).toHaveBeenCalledWith("New Value");
    expect(mockOnSave).toHaveBeenCalledWith("New Value");
  });

  test("calls handleCancel when cancelOnBlur is true and input is blurred",
    () => {
      render(
        <EasyEdit
          type={Types.TEXT}
          value="Initial Value"
          onSave={mockOnSave}
          onCancel={mockOnCancel}
          cancelOnBlur={true}
          editMode={true}
        />
      );

      const inputElement = screen.getByDisplayValue("Initial Value");
      fireEvent.blur(inputElement);

      expect(mockOnCancel).toHaveBeenCalled();
    });

  test("calls handleEditing when edit button is clicked", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        editButtonLabel="Edit"
        editMode={false}
        hideEditButton={false}
      />
    );

    fireEvent.click(screen.getByText("Edit"));

    const inputElement = screen.getByDisplayValue("Initial Value");
    expect(inputElement).toBeInTheDocument();
  });

  test("handles checkbox changes correctly", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ];
    render(
      <EasyEdit
        type={Types.CHECKBOX}
        value={[]}
        onSave={mockOnSave}
        options={options}
        editMode={true}
      />
    );

    // Check Option 1
    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(screen.getByLabelText("Option 1")).toBeChecked();

    // Check Option 2
    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(screen.getByLabelText("Option 2")).toBeChecked();

    // Uncheck Option 1
    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(screen.getByLabelText("Option 1")).not.toBeChecked();

    // Save changes
    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSave).toHaveBeenCalledWith(["option2"]);
  });

  it('ensures editing state is correctly updated when editMode prop changes', () => {
    const { rerender } = render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        editMode={false}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    // Initially editing should be false
    let inputElement = screen.queryByDisplayValue('Initial Value');
    expect(inputElement).toBeNull();

    // Re-render component with editMode set to true
    rerender(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        editMode={true}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    // Now editing should be true and input should be rendered
    inputElement = screen.getByDisplayValue('Initial Value');
    expect(inputElement).toBeInTheDocument();

    // Re-render component with editMode set back to false
    rerender(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        editMode={false}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    // Editing should be false again and input should not be present
    inputElement = screen.queryByDisplayValue('Initial Value');
    expect(inputElement).toBeNull();
  });

  test(
    "renders instructions when editing or in editMode and instructions are provided",
    () => {
      render(
        <EasyEdit
          type={Types.TEXT}
          value="Initial Value"
          onSave={mockOnSave}
          editMode={true}
          instructions="Please enter a value"
        />
      );

      expect(screen.getByText("Please enter a value")).toBeInTheDocument();
    });

  test("sets CSS classes from viewAttributes correctly", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        viewAttributes={{
          className: "custom-class another-custom-class"
        }}
      />
    );

    const wrapperElement = screen.getByText("Initial Value").closest(
      ".easy-edit-wrapper");
    expect(wrapperElement).toHaveClass("custom-class");
    expect(wrapperElement).toHaveClass("another-custom-class");
  });

  test("adds class from viewAttributes correctly", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        viewAttributes={{ class: "custom-class" }}
      />
    );

    const wrapperElement = screen.getByText("Initial Value").closest(
      ".easy-edit-wrapper");
    expect(wrapperElement).toHaveClass("custom-class");
  });

  test("sets not-allowed CSS class when allowEdit is false", () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        allowEdit={false}
      />
    );

    const wrapperElement = screen.getByText("Initial Value").closest(
      ".easy-edit-wrapper");
    expect(wrapperElement).toHaveClass("easy-edit-not-allowed");
  });

  test('sets hover CSS class when hover is true', () => {
    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        onHoverCssClass="custom-hover-class"
      />
    );

    const wrapperElement = screen.getByText('Initial Value').closest('.easy-edit-wrapper');
    fireEvent.mouseEnter(wrapperElement);

    expect(wrapperElement).toHaveClass('custom-hover-class');
  });

  test('renders placeholder when currentValue is null or undefined', () => {
    render(
      <EasyEdit
        type={Types.CHECKBOX}
        value={null}
        onSave={mockOnSave}
        placeholder="Select options"
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
      />
    );

    expect(screen.getByText('Select options')).toBeInTheDocument();
  });

  test('renders selected checkbox options', () => {
    render(
      <EasyEdit
        type={Types.CHECKBOX}
        value={['1']}
        onSave={mockOnSave}
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('renders selected non-checkbox options', () => {
    render(
      <EasyEdit
        type={Types.SELECT}
        value="2"
        onSave={mockOnSave}
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('renders currentValue when no matching options are found', () => {
    render(
      <EasyEdit
        type={Types.SELECT}
        value="3"
        onSave={mockOnSave}
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('throws error for unsupported type', () => {
    expect(() => {
      render(
        <EasyEdit
          type="unsupported-type"
          value="Initial Value"
          onSave={mockOnSave}
        />
      );
    }).toThrow(Globals.ERROR_UNSUPPORTED_TYPE);
  });

  test('renders EasyDropdown correctly for select input', () => {
    render(
      <EasyEdit
        type={Types.SELECT}
        value="1"
        onSave={mockOnSave}
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
        placeholder="Select an option"
        editMode={true}
      />
    );

    const selectElement = screen.getByDisplayValue('Option 1');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('renders EasyRadio correctly for radio input', () => {
    render(
      <EasyEdit
        type={Types.RADIO}
        value="2"
        onSave={mockOnSave}
        options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
        editMode={true}
      />
    );

    const radioElement = screen.getByDisplayValue('2');
    expect(radioElement).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  test('renders EasyDatalist correctly for datalist input', () => {
    render(
      <EasyEdit
        type={Types.DATALIST}
        value="Option 1"
        onSave={mockOnSave}
        options={[{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }]}
        placeholder="Select an option"
        editMode={true}
      />
    );

    const datalistInput = screen.getByDisplayValue('Option 1');
    expect(datalistInput).toBeInTheDocument();

    fireEvent.focus(datalistInput);

    fireEvent.change(datalistInput, { target: { value: 'Option 2' } });
    expect(datalistInput.value).toBe('Option 2');

    const datalist = screen.getByRole('combobox');
    expect(datalist).toBeInTheDocument();
  });

  test('renders EasyColor correctly for color input', () => {
    render(
      <EasyEdit
        type={Types.COLOR}
        value="#ff0000"
        onSave={mockOnSave}
        editMode={true}
      />
    );

    const colorElement = screen.getByDisplayValue('#ff0000');
    expect(colorElement).toBeInTheDocument();
  });

  test('renders displayComponent correctly when provided', () => {
    const DisplayComponent = ({ value }) => <span>Display: {value}</span>;

    render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        displayComponent={<DisplayComponent />}
        editMode={false}
      />
    );

    expect(screen.getByText('Display: Initial Value')).toBeInTheDocument();
  });

  test('renders COLOR input correctly for color type', () => {
    render(
      <EasyEdit
        type={Types.COLOR}
        value="#ff0000"
        onSave={mockOnSave}
        viewAttributes={{ id: 'color-input' }}
        editMode={true}
      />
    );

    const colorInput = screen.getByDisplayValue('#ff0000');
    expect(colorInput).toBeInTheDocument();
    expect(colorInput).toHaveAttribute('type', 'color');
  });

  test('sets editing state based on editMode prop', () => {
    const { rerender } = render(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        editMode={false}
      />
    );

    // Initially, editing should be false
    let inputElement = screen.queryByDisplayValue('Initial Value');
    expect(inputElement).not.toBeInTheDocument();

    // Update editMode to true
    rerender(
      <EasyEdit
        type={Types.TEXT}
        value="Initial Value"
        onSave={mockOnSave}
        editMode={true}
      />
    );

    // Now, editing should be true
    inputElement = screen.getByDisplayValue('Initial Value');
    expect(inputElement).toBeInTheDocument();
  });
});
