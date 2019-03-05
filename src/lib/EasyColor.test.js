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
            name="test"
            onChange={onChange}
            value="#ff00ff"
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('input[name="test"]')).toHaveLength(1);
  });

  it('should call onChange if the value of the input is changed', () => {
    wrapper.simulate('change', {target: {value: '#000000'}});
    expect(onChange).toBeCalled();
  });
});
