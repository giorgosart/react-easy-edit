import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Editable from "./Editable";

configure({adapter: new Adapter()});

describe('Editable - Save and Cancel buttons', () => {
  let wrapper;
  const saveFn = jest.fn();
  const cancelFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <Editable
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
    expect(wrapper.find('div.editable-hover-on')).toHaveLength(1);
  });

  it('hover off', () => {
    wrapper.simulate('mouseEnter');
    wrapper.simulate('mouseLeave');
    expect((wrapper.state().hover)).toEqual(false);
    expect(wrapper.find('.editable-hover-on')).toHaveLength(0);
  });

  it('should show two buttons when the user clicks on the component', () => {
    wrapper.simulate('click');
    expect((wrapper.state().editing)).toEqual(true);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  //-------------------------- PLACEHOLDER -------------------------
  it('should use the default placeholder if none provided', () => {
    wrapper.simulate('click');
    expect(wrapper.find('input').props().placeholder).toEqual('Click to edit');
  });

  it('should use the provided placeholder', () => {
    wrapper.setProps({placeholder: 'TEST'});
    wrapper.simulate('click');
    expect(wrapper.find('input').props().placeholder).toEqual('TEST');
  });

  it('should not show a placeholder if there is already a value available', () => {
    wrapper.setState({
      value: 'Test'
    });
    wrapper.simulate('click');
    expect(wrapper.find('input').props().value).toEqual('Test');
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
});

describe('Editable - Textarea', () => {

  let wrapper;
  const saveFn = jest.fn();
  const cancelFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <Editable
            type="textarea"
            onSave={saveFn}
            onCancel={cancelFn}
            name="test"
        />);
  });

  it('should render a textarea based on props', () => {
    wrapper.simulate('click');
    expect(wrapper.find('textarea')).toBeTruthy();
  });
});

describe('Editable - Select', () => {
  let wrapper;
  const saveFn = jest.fn();
  const cancelFn = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <Editable
            type="select"
            onSave={saveFn}
            onCancel={cancelFn}
            name="test"
            options={options}
        />);
  });

  it('should render a select based on props', () => {
    wrapper.simulate('click');
    expect(wrapper.find('select')).toBeTruthy();
  });

  it('when simulating a change, select should update its value', () => {
    wrapper.simulate('click');
    wrapper.find('select').simulate('change', {target: {value: 1}});
    expect(wrapper.state().value).toBe(1);
  });
});

