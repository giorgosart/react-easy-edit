import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import EasyEdit from "./EasyEdit";
import EasyInput from "./EasyInput";
import EasyParagraph from "./EasyParagraph";
import EasyRadio from "./EasyRadio";
import EasyCheckbox from "./EasyCheckbox";
import EasyDropdown from "./EasyDropdown";
import EasyColor from "./EasyColor";
import EasyCustom from './EasyCustom';
import Globals from './globals';
import {
  fireEvent,
  render
} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

configure({ adapter: new Adapter() });

const saveFn = jest.fn();
const blurFn = jest.fn();
const focusFn = jest.fn();
const cancelFn = jest.fn();
const deleteFn = jest.fn();
const options = [{ label: 'Test One', value: 1 },
  { label: 'Test Two', value: 2 }];

describe('EasyEdit', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <EasyEdit
        type="text"
        onSave={saveFn}
        onFocus={focusFn}
        onBlur={blurFn}
        onCancel={cancelFn}
        onDelete={deleteFn}
        saveButtonLabel="Save Test"
        saveButtonStyle="save-style"
        cancelButtonLabel="Cancel Test"
        cancelButtonStyle="cancel-style"
        deleteButtonLabel={"Delete Test"}
        deleteButtonStyle="delete-style"
        attributes={{ name: 'test' }}
        instructions="My instructions"
      />);
  });

  it('on click', () => {
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(true);
  });

  it('on click - non editable', () => {
    wrapper.setProps({ allowEdit: false });
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(false);
  });

  it('on hover - non editable should show a not-allowed cursor', () => {
    wrapper.setProps({ allowEdit: false });
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('div.easy-edit-not-allowed')).toHaveLength(1);
  });

  it('should apply the passed in css class on hover', () => {
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('div.easy-edit-hover-on')).toHaveLength(1);
    wrapper.setProps({onHoverCssClass: 'test'});
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('div.easy-edit-hover-on')).toHaveLength(0);
    expect(wrapper.find('div.test')).toHaveLength(1);
  });

  // it('onKeyDown', () => {
  //   wrapper = mount(
  //     <EasyEdit
  //       type="text"
  //       onSave={saveFn}
  //       onCancel={cancelFn}
  //       saveButtonLabel="Save Test"
  //       saveButtonStyle="save-style"
  //       cancelButtonLabel="Cancel Test"
  //       cancelButtonStyle="cancel-style"
  //       attributes={{ name: 'test' }}
  //       instructions="My instructions"
  //     />);
  //   wrapper.simulate('click');
  //   expect(wrapper.find('input[name="test"]')).toHaveLength(1);
  //   wrapper.find('input[name="test"]').simulate('keyDown', { keyCode: 27 });
  //   expect(wrapper.find('input[name="test"]')).toHaveLength(0);
  // });

  it('should populate the tempValue with the passed in value prop on mount and also when the value prop is changed', () => {
    wrapper = shallow(
      <EasyEdit
        type="text"
        onSave={saveFn}
        onCancel={cancelFn}
        value="Test Value"
        saveButtonLabel="Save Test"
        saveButtonStyle="save-style"
        cancelButtonLabel="Cancel Test"
        cancelButtonStyle="cancel-style"
        attributes={{ name: 'test' }}
      />);
    expect((wrapper.state().tempValue)).toEqual('Test Value');
    wrapper.setProps({ value: "Updated Value" });
    expect((wrapper.state().tempValue)).toEqual('Updated Value');
  });

  it('hover on', () => {
    wrapper.simulate('mouseEnter');
    expect((wrapper.state().hover)).toEqual(true);
    expect(wrapper.find('div.easy-edit-hover-on')).toHaveLength(1);
  });

  it('hover off', () => {
    wrapper.simulate('mouseEnter');
    wrapper.simulate('mouseLeave');
    expect((wrapper.state().hover)).toEqual(false);
    expect(wrapper.find('.easy-edit-hover-on')).toHaveLength(0);
  });

  it('should show two buttons when the user clicks on the component', () => {
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(true);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should render the passed in value', () => {
    wrapper.setState({ value: "Test" });
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Test")
  });

  //--------------------------- Styling ----------------------------
  it('should append the css classes passed in the viewAttributes prop to the main div', () => {
    wrapper.setProps({
      viewAttributes: { class: 'test', className: 'test2' },
    });
    expect(wrapper.find('div.test')).toHaveLength(1);
    expect(wrapper.find('div.test2')).toHaveLength(1);
  });

  //--------------------------- Button Position----------------------
  it('should render the buttons after the input', () => {
    wrapper.simulate('click');
    expect(wrapper.html().toString()).toContain('<div class="easy-edit-inline-wrapper" tabindex="0"><div class="easy-edit-component-wrapper">');
  });

  it('should render the buttons before the input', () => {
    wrapper.setProps({ buttonsPosition: 'before' });
    wrapper.simulate('click');
    expect(wrapper.html().toString()).toContain('<div class="easy-edit-inline-wrapper" tabindex="0"><div class="easy-edit-button-wrapper"><button');
  });

  it('should hide the save button when hideSaveButton is set to true', () => {
    wrapper.setProps({ hideSaveButton: true });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"]').exists()).toEqual(false);
    expect(wrapper.find('button[name="cancel"]').exists()).toEqual(true);
  });

  it('should hide the cancel button when hideCancelButton is set to true', () => {
    wrapper.setProps({ hideCancelButton: true });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"]').exists()).toEqual(false);
    expect(wrapper.find('button[name="save"]').exists()).toEqual(true);
  });

  it('should show the buttons when hideSaveButton or hideCancelButton is not set explicitly', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"]').exists()).toEqual(true);
    expect(wrapper.find('button[name="cancel"]').exists()).toEqual(true);
  });

  //-------------------------- SAVE BUTTON ---------w-----------------
  it('should use the prop value for the "Save" button label', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"]').text()).toEqual("Save Test");
  });

  it('should use the prop value for the "Save" button style', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"].save-style')).toHaveLength(1);
  });

  it('should trigger the onSave fn when the "Save" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="save"]').simulate('click');
    expect(saveFn).toBeCalled();
  });

  //-------------------------- CANCEL BUTTON -------------------------
  it('should use the prop value for the "Cancel" button label', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"]').text()).toEqual("Cancel Test");
  });

  it('should use the prop value for the "Cancel" button style', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"].cancel-style')).toHaveLength(1);
  });

  it('should trigger the onCancel fn when the "cancel" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');
    expect(cancelFn).toBeCalled();
  });

  //-------------------------- DELETE BUTTON -------------------------
  it('should use the prop value for the "Delete" button label', () => {
    wrapper.setProps({ hideDeleteButton: false });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="delete"]').text()).toEqual("Delete Test");
  });

  it('should use the prop value for the "Delete" button style', () => {
    wrapper.setProps({ hideDeleteButton: false });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="delete"].delete-style')).toHaveLength(1);
  });

  it('should trigger the onSave fn when the "delete" button is clicked', () => {
    wrapper.setProps({ hideDeleteButton: false });
    wrapper.simulate('click');
    wrapper.find('button[name="delete"]').simulate('click');
    expect(deleteFn).toBeCalled();
    expect(wrapper.state().isHidden).toEqual(true);
  });

  //-------------------------- TYPES ---------------------------------
  it('type input', () => {
    wrapper.simulate('click');
    expect(wrapper.find(EasyInput)).toHaveLength(1);
  });

  it('type textarea', () => {
    wrapper.setProps({ type: 'textarea' });
    wrapper.simulate('click');
    expect(wrapper.find(EasyParagraph)).toHaveLength(1);
  });

  it('type color', () => {
    wrapper.setProps({ type: 'color' });
    wrapper.simulate('click');
    expect(wrapper.find(EasyColor)).toHaveLength(1);
  });

  it('type radio', () => {
    wrapper.setProps({ type: 'radio' });
    wrapper.simulate('click');
    expect(wrapper.find(EasyRadio)).toHaveLength(1);
  });

  it('should show an EasyCustom component if an editComponent prop is provided', () => {
    wrapper.setProps({ editComponent: <input /> });
    wrapper.simulate('click');
    expect(wrapper.find(EasyCustom)).toHaveLength(1);
  });

  it('type checkbox', () => {
    wrapper.setProps({
      type: 'checkbox',
      options: options
    });
    wrapper.simulate('click');
    expect(wrapper.find(EasyCheckbox)).toHaveLength(1);
  });

  it('should show multiple selected checkbox values separated with ", ".',
    () => {
      wrapper.setProps({
        type: 'checkbox',
        options: options
      });
      wrapper.setState({
        value: [options[0].value]
      });
      expect(wrapper.text()).toEqual(options[0].label);
      wrapper.setState({
        value: [options[0].value, options[1].value]
      });
      expect(wrapper.text()).toEqual(
        options[0].label + `, ` + options[1].label);
    });

  it('type select', () => {
    wrapper.setProps({ type: 'select' });
    wrapper.simulate('click');
    expect(wrapper.find(EasyDropdown)).toHaveLength(1);
  });

  it('should throw a type error if unknown type is passed in', () => {
    expect(() => {
      wrapper.setProps({ type: 'error' });
      wrapper.simulate('click');
    }).toThrow(new Error(Globals.ERROR_UNSUPPORTED_TYPE));
  });

  it('should throw a type error if no type is passed in', () => {
    expect(() => {
      wrapper.setProps({ type: null });
      wrapper.simulate('click');
    }).toThrow(new Error(Globals.ERROR_UNSUPPORTED_TYPE));
  });

  it('should set the instructions provided as a prop', () => {
    expect(wrapper.find('.easy-edit-instructions')).toHaveLength(0);
    wrapper.simulate('click');
    expect(wrapper.find('.easy-edit-instructions')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-instructions').text()).toEqual("My instructions");
  });

  it('fails validation and shows the appropriate error', () => {
    const failValidation = () => { return false };

    wrapper.setProps({ onValidate: failValidation });
    wrapper.simulate('click');
    wrapper.find('.save-style').simulate('click');
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.find('.easy-edit-validation-error').text()).toEqual('Please provide a valid value');
  });

  it('should render the passed in displayComponent', () => {
    wrapper.setProps({ displayComponent: <div id="test-display-component" /> });
    expect(wrapper.find('#test-display-component')).toBeTruthy();
  });

  it('should hide the delete button by default', () => {
    wrapper.setProps({ hideDeleteButton: true });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="delete"]').exists()).toEqual(false);
  });

  it('should show a delete button when the prop hideDeleteButton is set to true', () => {
    wrapper.setProps({ hideDeleteButton: false });
    wrapper.simulate('click');
    expect(wrapper.find('button[name="delete"]').exists()).toEqual(true);
  });

  it('should render the component in edit mode if editMode is set to true', () => {
    const { container, rerender, getByText } = render(
        <EasyEdit
            type="text"
            value="Auto-submit onBlur"
            onSave={() => {}}
            attributes={{ name: 'test' }}
            instructions="test"
        />
    );

    expect(container.querySelector('input[name="test"]')).toBeNull();

    rerender(
        <EasyEdit
            type="text"
            value="Auto-submit onBlur"
            onSave={() => {}}
            attributes={{ name: 'test' }}
            instructions="test"
            editMode={true}
        />
    );

    expect(container.querySelector('input[name="test"]')).not.toBeNull();
    expect(getByText("test")).toBeInTheDocument();
  });


  it('should save the value if the editMode prop is changed', () => {
    wrapper.setProps({ editMode: true });
    expect((wrapper.state().tempValue)).toEqual(null);
    wrapper.setProps({ value: "Updated Value", editMode: false });
    expect((wrapper.state().tempValue)).toEqual('Updated Value');
  });

  it('should render a placeholder element', () => {
    let err = jest.spyOn(global.console, 'error');
    wrapper = shallow(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
        />);
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("test");
    expect(err).not.toHaveBeenCalled();

    err.mockReset();
    err.mockRestore();
  });

  it('should not render a placeholder element when a non-nullish falsy value provided', () => {
    let err = jest.spyOn(global.console, 'error');
    wrapper = shallow(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            value={0}
        />);
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("0");
    expect(err).not.toHaveBeenCalled();

    err.mockReset();
    err.mockRestore();
  });

  it('should render a placeholder element when a Null or undefined or Empty value provided', () => {
    wrapper = shallow(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>Placeholder</span>}
            value={null}
        />);
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Placeholder");
    wrapper.setProps({ value: undefined});
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Placeholder");
    wrapper.setProps({ value: ''});
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Placeholder");
    wrapper.setProps({ value: 'A value'});
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("A value");
  });
});

describe('EasyEdit #170 only show buttons if users hovers over the component while in edit mode', () => {
  it('should handle onMouseEnter event', () => {
    const { getByTestId, container } = render(
        <EasyEdit
            type="text"
            viewAttributes={{"data-testid": "hover-test"}}
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            showEditViewButtonsOnHover={true}
            value={"Test"}
        />
    );

    const component = getByTestId('hover-test');

    fireEvent.click(component);
    fireEvent.mouseEnter(component);

    const buttonWrapper = container.querySelector('.easy-edit-button-wrapper');
    expect(buttonWrapper).toBeInTheDocument();
  });

  it('should handle onMouseLeave event', () => {
    const { getByTestId, container } = render(
        <EasyEdit
            type="text"
            viewAttributes={{"data-testid": "hover-test"}}
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            value={"Test"}
        />
    );

    const component = getByTestId('hover-test');

    fireEvent.click(component);
    fireEvent.mouseEnter(component);

    const buttonWrapper = container.querySelector('.easy-edit-button-wrapper');

    const saveButton = buttonWrapper.querySelector('button[name="save"]');
    const cancelButton = buttonWrapper.querySelector('button[name="cancel"]');

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});

describe('EasyEdit #170 only show buttons if users hovers over the component while in view mode', () => {
  it('should handle onMouseEnter event', () => {
    const { getByTestId, container } = render(
        <EasyEdit
            type="text"
            viewAttributes={{"data-testid": "hover-test"}}
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            showViewButtonsOnHover={true}
            value={"Test"}
            hideEditButton={false}
        />
    );

    const component = getByTestId('hover-test');

    fireEvent.mouseEnter(component);
    let buttonWrapper = container.querySelector('.easy-edit-view-button-wrapper');
    let saveButton = buttonWrapper.querySelector('button[name="edit"]');
    expect(saveButton).toBeInTheDocument();
    fireEvent.mouseOut(component);
    buttonWrapper = container.querySelector('.easy-edit-view-button-wrapper');
    expect(buttonWrapper).toBeNull();
  });
});

describe('generateEditButton function', () => {
  const cssClassPrefix = 'test-prefix';
  const editButtonLabel = 'Edit button';
  const editButtonStyle = "custom-style";

  it('renders the edit button when hideEditButton is false, applies custom label and style', () => {
    const { getByText } = render(
        <EasyEdit
            type="text"
            cssClassPrefix={cssClassPrefix}
            hideEditButton={false}
            editButtonLabel={editButtonLabel}
            editButtonStyle={editButtonStyle}
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            value={"Test"}
        />
    );

    const editButton = getByText('Edit button');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("custom-style");
  });

  it('does not render the edit button when hideEditButton is true', () => {
    const { queryByText } = render(
        <EasyEdit
            type="text"
            cssClassPrefix={cssClassPrefix}
            hideEditButton={true}
            editButtonLabel={editButtonLabel}
            editButtonStyle={editButtonStyle}
            onSave={saveFn}
            onCancel={cancelFn}
            placeholder={<span>test</span>}
            value={"Test"}
        />
    );

    const editButton = queryByText('Edit button'); // Change this to match the expected text of your edit button
    expect(editButton).toBeNull();
  });
});

describe('EasyEdit _onBlur tests', () => {
  const onBlurMock = jest.fn();
  const onCancelMock = jest.fn();
  const onSaveMock = jest.fn();

  it('should call _onBlur with saveOnBlur=true', () => {
    const { container } = render(
        <EasyEdit
            type="text"
            value="Test Value"
            onBlur={onBlurMock}
            saveOnBlur={true}
            onSave={onSaveMock}
            editMode={true}
        />
    );

    const input = container.querySelector('input'); // Replace with the actual input selector

    fireEvent.blur(input);
    expect(onBlurMock).toHaveBeenCalledTimes(1);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('should call _onBlur with cancelOnBlur=true', () => {
    const { container } = render(
        <EasyEdit
            type="text"
            value="Test Value"
            onBlur={onBlurMock}
            cancelOnBlur={true}
            onCancel={onCancelMock}
            onSave={onSaveMock}
            editMode={true}
        />
    );

    const input = container.querySelector('input'); // Replace with the actual input selector

    fireEvent.focusOut(input);
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should call _onBlur with neither saveOnBlur nor cancelOnBlur', () => {
    const { container } = render(
        <EasyEdit
            type="text"
            value="Test Value"
            onBlur={onBlurMock}
            onSave={onSaveMock}
            editMode={true}
        />
    );

    const input = container.querySelector('input'); // Replace with the actual input selector

    fireEvent.blur(input);
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('should show a warning message when both saveOnBlur and cancelOnBlur are true', () => {
    console.warn = jest.fn(); // Mock console.warn
    const { container } = render(
        <EasyEdit
            type="text"
            value="Test Value"
            onBlur={onBlurMock}
            saveOnBlur={true}
            cancelOnBlur={true}
            onSave={onSaveMock}
            editMode={true}
        />
    );

    const input = container.querySelector('input'); // Replace with the actual input selector

    fireEvent.blur(input);
    expect(console.warn).toHaveBeenCalledWith(
        "EasyEdit: You've set both `saveOnBlur` and `cancelOnBlur` to true, please set either one to false."
    );
  });
});

describe('onChange', () => {
  it('should update the input value when changed', () => {
    const { container } = render(
        <EasyEdit
            type="text"
            value="Initial Value"
            onSave={() => {}}
            editMode={true}
        />
    );

    const input = container.querySelector('input'); // Adjust the selector as needed

    fireEvent.change(input, { target: { value: 'Updated Value' } });
    expect(input.value).toBe('Updated Value');
  });

  it('should update the textarea value when changed', () => {
    const { container } = render(
        <EasyEdit
            type="textarea"
            value="Initial Value"
            onSave={() => {}}
            editMode={true}
        />
    );

    const textarea = container.querySelector('textarea'); // Adjust the selector as needed

    fireEvent.change(textarea, { target: { value: 'Updated Value' } });
    expect(textarea.value).toBe('Updated Value');
  });
});

describe('Error handling for unsupported types', () => {
  it('should throw an error for an unsupported type', () => {

    const renderComponent = () => {
      render(
          <EasyEdit
              type="unsupportedType"
              value="Test Value"
              onSave={() => {}}
          />
      );
    };

    expect(renderComponent).toThrowError('Unsupported component type, please review documentation for supported HTML component types');
  });

  it('should not throw an error for a supported type', () => {
    const renderComponent = () => {
      render(
          <EasyEdit
              type={"text"}
              value="Test Value"
              onSave={() => {}}
          />
      );
    };
    expect(renderComponent).not.toThrow();
  });
});
