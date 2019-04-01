import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyInput from "./EasyInput";

configure({adapter: new Adapter()});

describe('EasyInput', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <EasyInput
            type="text"
            onChange={onChange}
            value="TEST VALUE"
            attributes={{name: 'test'}}
            instructions="My instructions"
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
  });

  it('should set the instructions provided as a prop', () => {
    expect(wrapper.find('.easy-edit-instructions')).toHaveLength(1);
    expect(wrapper.find('.easy-edit-instructions').text()).toEqual("My instructions");
  });

  it('should use the default placeholder if none provided', () => {
    expect(wrapper.find('input').props().placeholder).toEqual('Click to edit');
  });

  it('should use the provided placeholder', () => {
    wrapper.setProps({placeholder: 'TEST'});
    expect(wrapper.find('input').props().placeholder).toEqual('TEST');
  });

  it('should not show a placeholder if there is a value available', () => {
    wrapper.setProps({value: 'Test'});
    expect(wrapper.find('input').props().value).toEqual('Test');
  });

  it('should call onChange if the value of the input is changed', () => {
    wrapper.find('input').simulate('change', {target: {value: 'abc'}});
    expect(onChange).toBeCalled();
  });
});
