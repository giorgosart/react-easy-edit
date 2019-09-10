import React from 'react';
import {configure, shallow, mount} from 'enzyme';
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

configure({adapter: new Adapter()});

describe('EasyEdit', () => {
  let wrapper;
  const saveFn = jest.fn();
  const cancelFn = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onCancel={cancelFn}
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
            attributes={{name: 'test'}}
            instructions="My instructions"
        />);
  });

  it('on click', () => {
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(true);
  });

  it('on click - non editable', () => {
    wrapper.setProps({allowEdit: false});
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(false);
  });

  it('on hover - non editable should show a not-allowed cursor', () => {
    wrapper.setProps({allowEdit: false});
    wrapper.simulate('mouseEnter');
    expect(wrapper.find('div.easy-edit-not-allowed')).toHaveLength(1);
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
            attributes={{name: 'test'}}
            instructions="My instructions"
        />);
    wrapper.simulate('click');
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    wrapper.find('input[name="test"]').simulate('keyDown', {keyCode: 27});
    expect(wrapper.find('input[name="test"]')).toHaveLength(0);
  });

  it('should populate the tempValue with the passed in value prop', () => {
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
            attributes={{name: 'test'}}
        />);
    expect((wrapper.state().tempValue)).toEqual('Test Value');
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
    wrapper.setState({value: "Test"});
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Test")
  });

  //-------------------------- SAVE BUTTON --------------------------
  it('should use the prop value for the "Save" button label', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"]').text()).toEqual("Save Test")
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
    expect(wrapper.find('button[name="cancel"]').text()).toEqual("Cancel Test")
  });

  it('should use the prop value for the "Cancel" button style', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"].cancel-style')).toHaveLength(1);
  });

  it('should trigger the onSave fn when the "cancel" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');
    expect(cancelFn).toBeCalled();
  });

  //-------------------------- TYPES ---------------------------------
  it('type input', () => {
    wrapper.simulate('click');
    expect(wrapper.find(EasyInput)).toHaveLength(1);
  });

  it('type textarea', () => {
    wrapper.setProps({type: 'textarea'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyParagraph)).toHaveLength(1);
  });

  it('type color', () => {
    wrapper.setProps({type: 'color'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyColor)).toHaveLength(1);
  });

  it('type radio', () => {
    wrapper.setProps({type: 'radio'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyRadio)).toHaveLength(1);
  });

  it('should show an EasyCustom component if an editComponent prop is provided', () => {
    wrapper.setProps({editComponent: <input />});
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
    wrapper.setProps({type: 'select'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyDropdown)).toHaveLength(1);
  });

  it('type error', () => {
    try {
      wrapper.setProps({type: 'error'});
      wrapper.simulate('click');
    } catch (e) {
      expect(e.message).toBe(Globals.ERROR_UNSUPPORTED_TYPE);
    }
  });

  it('should set the instructions provided as a prop', () => {
    expect(wrapper.find('.easy-edit-instructions')).toHaveLength(0);
    wrapper.simulate('click');
    expect(wrapper.find('.easy-edit-instructions')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-instructions').text()).toEqual("My instructions");
  });

  it('fails validation and shows the appropriate error', () => {
    const failValidation = () => {return false};

    wrapper.setProps({onValidate: failValidation});
    wrapper.simulate('click');
    wrapper.find('.save-style').simulate('click');
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.find('.easy-edit-validation-error').text()).toEqual('Please provide a valid value');
  });

  it('utilises props when component placeholder is rendered', () => {
    expect(wrapper.find('.easy-edit-wrapper[name]')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-wrapper[testattribute]')).toHaveLength(0);
    wrapper.setProps({attributes: {name: 'test', testattribute: 'test'}});
    expect(wrapper.find('.easy-edit-wrapper[name]')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-wrapper[testattribute]')).toHaveLength(1);
  });
});
