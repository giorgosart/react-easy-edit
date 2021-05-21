import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
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
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
  });

  it('should call onChange if the value of the input is changed', () => {
    wrapper.find('input[name="test"]').simulate('change', {target: {value: '#000000'}});
    expect(onChange).toBeCalled();
  });
});
