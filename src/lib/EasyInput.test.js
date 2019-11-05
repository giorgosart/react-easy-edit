import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyInput from "./EasyInput";
import EasyEdit from "./EasyEdit";

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
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
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

  it('#25 should render defaultValue if the value is equal with an empty string ""', () => {
    const attributes = {defaultValue: 'default'};
    wrapper.setProps({attributes: attributes, value: ''});
    expect(wrapper.find('input').props().defaultValue).toEqual('default');
  });

  it('#25 should render defaultValue if the value is undefined', () => {
    const attributes = {defaultValue: 'default'};
    wrapper.setProps({attributes: attributes, value: undefined});
    expect(wrapper.find('input').props().defaultValue).toEqual('default');
  });

  it('should auto submit when the enter key is pressed', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            attributes={{name: 'test'}}
        />);
    wrapper.simulate('click');
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    wrapper.find('input[name="test"]').simulate('keyDown', {keyCode: 27});
    expect(wrapper.find('input[name="test"]')).toHaveLength(0);
  });

  it("should update the tempValue with with user's input", () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            attributes={{name: 'test'}}
        />);
    wrapper.simulate('click');
    wrapper.find('input[name="test"]').simulate('change', {target: { value: 'the-value' }});
    expect(wrapper.state('tempValue')).toEqual('the-value');
  });
});
