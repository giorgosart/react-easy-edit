import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyEdit from "./EasyEdit";
import EasyInput from "./EasyInput";
import EasyParagraph from "./EasyParagraph";
import EasyRadio from "./EasyRadio";
import EasyCheckbox from "./EasyCheckbox";
import EasyDropdown from "./EasyDropdown";

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
            name="test"
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
        />);
  });

  it('on click', () => {
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(true);
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

  it('type radio', () => {
    wrapper.setProps({type: 'radio'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyRadio)).toHaveLength(1);
  });

  it('type checkbox', () => {
    wrapper.setProps({
      type: 'checkbox',
      options: options
    });
    wrapper.simulate('click');
    expect(wrapper.find(EasyCheckbox)).toHaveLength(1);
  });

  it('type select', () => {
    wrapper.setProps({type: 'select'});
    wrapper.simulate('click');
    expect(wrapper.find(EasyDropdown)).toHaveLength(1);
  });
});
