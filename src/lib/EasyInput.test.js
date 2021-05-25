import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EasyInput from "./EasyInput";
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyInput', () => {
  let wrapper;
  const onChange = jest.fn();
  const blurFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <EasyInput
            type="text"
            onChange={onChange}
            onBlur={blurFn}
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

  it('should trigger the onBlur fn when component looses focus', () => {
    wrapper.find('input').simulate('blur');
    expect(blurFn).toBeCalled();
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
    wrapper.find('input[name="test"]').simulate('change', {target: {value: 'abc'}});
    wrapper.find('input[name="test"]').simulate('keyDown', {keyCode: 13});
    expect(wrapper.find('input[name="test"]')).toHaveLength(0);
    expect(wrapper.state().value).toEqual('abc');
  });

  it('should not auto cancel when the esc key is pressed and disableAutoCancel is true', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            attributes={{name: 'test'}}
            disableAutoCancel
        />);
    wrapper.simulate('click');
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    wrapper.find('input[name="test"]').simulate('keyDown', {keyCode: 27});
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
  });

  it('should not auto submit when the enter key is pressed and disableAutoSubmit is true', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            attributes={{name: 'test'}}
            disableAutoSubmit
        />);
    wrapper.simulate('click');
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
    wrapper.find('input[name="test"]').simulate('keyDown', {keyCode: 13});
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
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

  it("should cull the attributes prop appropriately", () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            attributes={{type:'number', className: 'test', value:'Test', onChange:()=>{alert("Whaaaa?")}}}
        />);
    wrapper.simulate('click');
    expect(wrapper.props().attributes).toEqual({"className": "test"});
  });

  it("should apply the cssClassPrefix", () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={jest.fn()}
            cssClassPrefix="test"
        />);
    wrapper.simulate('click');
    expect(wrapper.find('div.testeasy-edit-inline-wrapper')).toHaveLength(1);
    expect(wrapper.find('div.testeasy-edit-component-wrapper')).toHaveLength(1);
    expect(wrapper.find('div.testeasy-edit-button-wrapper')).toHaveLength(1);
    expect(wrapper.find('button.testeasy-edit-button')).toHaveLength(2);
  });
});
