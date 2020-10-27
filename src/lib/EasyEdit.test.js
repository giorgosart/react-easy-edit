import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyEdit from "./EasyEdit";
import EasyInput from "./EasyInput";
import EasyParagraph from "./EasyParagraph";
import EasyRadio from "./EasyRadio";
import EasyCheckbox from "./EasyCheckbox";
import EasyDropdown from "./EasyDropdown";
import EasyColor from "./EasyColor";
import EasyCustom from './EasyCustom';
import Globals from './globals';

configure({ adapter: new Adapter() });

describe('EasyEdit', () => {
  let wrapper;
  const saveFn = jest.fn();
  const blurFn = jest.fn();
  const focusFn = jest.fn();
  const cancelFn = jest.fn();
  const deleteFn = jest.fn();
  const options = [{ label: 'Test One', value: 1 },
  { label: 'Test Two', value: 2 }];

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

  it('onKeyDown', () => {
    wrapper = mount(
      <EasyEdit
        type="text"
        onSave={saveFn}
        onCancel={cancelFn}
        saveButtonLabel="Save Test"
        saveButtonStyle="save-style"
        cancelButtonLabel="Cancel Test"
        cancelButtonStyle="cancel-style"
        attributes={{ name: 'test' }}
        instructions="My instructions"
      />);
    wrapper.simulate('click');
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    wrapper.find('input[name="test"]').simulate('keyDown', { keyCode: 27 });
    expect(wrapper.find('input[name="test"]')).toHaveLength(0);
  });

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

  it('should trigger the onBlur fn when component looses focus', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onBlur={blurFn}
            onCancel={cancelFn}
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
            attributes={{ name: 'test' }}
            instructions="My instructions"
        />);
    wrapper.simulate('click');
    wrapper.find('input').simulate('blur');
    expect(blurFn).toBeCalled();
  });

  it('should trigger the onFocus fn when component is focused', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onFocus={focusFn}
            onCancel={cancelFn}
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
            attributes={{ name: 'test' }}
            instructions="My instructions"
        />);
    wrapper.simulate('click');
    wrapper.find('input').simulate('focus');
    expect(focusFn).toBeCalled();
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

  it('should auto-submit onBlur', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            value="Auto-submit onBlur"
            onSave={saveFn}
            saveOnBlur
        />
    );
    wrapper.simulate('click');
    wrapper.setProps({ value: "Updated Value"});
    wrapper.find('input').simulate('blur');
    expect((wrapper.state().tempValue)).toEqual('Updated Value');
  });

  it('should cancel onBlur', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            value="Cancel onBlur"
            onSave={saveFn}
            onCancel={cancelFn}
            cancelOnBlur
        />
    );
    wrapper.simulate('click');
    wrapper.setProps({ value: "Updated Value"});
    wrapper.find('input').simulate('blur');
    expect(cancelFn).toBeCalled();
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
    wrapper = mount(
        <EasyEdit
          type="text"
          value="Auto-submit onBlur"
          onSave={saveFn}
          attributes={{ name: 'test' }}
          instructions={"test"}
        />
    );
    expect(wrapper.find('input[name="test"]')).toHaveLength(0);
    wrapper.setProps({ editMode: true });
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-instructions').text()).toEqual("test");
  });
});
