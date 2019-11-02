import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyParagraph from "./EasyParagraph";
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyParagraph', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <EasyParagraph
            onChange={onChange}
            value="TEST VALUE"
            attributes={{name: 'test'}}
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('textarea[name="test"]')).toHaveLength(1);
  });

  it('should use the default placeholder if none provided', () => {
    expect(wrapper.find('textarea').props().placeholder).toEqual('Click to edit');
  });

  it('should use the provided placeholder', () => {
    wrapper.setProps({placeholder: 'TEST'});
    expect(wrapper.find('textarea').props().placeholder).toEqual('TEST');
  });

  it('should not show a placeholder if there is a value available', () => {
    wrapper.setProps({value: 'Test'});
    expect(wrapper.find('textarea').props().value).toEqual('Test');
  });

  it('should call onChange if the value of the input is changed', () => {
    wrapper.find('textarea').simulate('change', {target: {value: 'abc'}});
    expect(onChange).toBeCalled();
  });

  it('should ignore enter key press for paragraphs', () => {

    wrapper = mount(
        <EasyEdit
            type="textarea"
            onSave={jest.fn()}
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
            attributes={{name: 'test'}}
        />);
    wrapper.simulate('click');
    expect(wrapper.find('textarea[name="test"]')).toHaveLength(1);
    wrapper.find('textarea[name="test"]').simulate('keyDown', {keyCode: 13});
    expect(wrapper.find('textarea[name="test"]')).toHaveLength(1);
  });
});
