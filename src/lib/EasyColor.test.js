import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyColor from "./EasyColor";

configure({adapter: new Adapter()});

describe('EasyColor', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <EasyColor
            onChange={onChange}
            value="#ff00ff"
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


  it('should call onChange if the value of the input is changed', () => {
    wrapper.find('input[name="test"]').simulate('change', {target: {value: '#000000'}});
    expect(onChange).toBeCalled();
  });
});
