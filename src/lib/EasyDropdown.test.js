import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyDropdown from "./EasyDropdown";

configure({adapter: new Adapter()});

describe('EasyDropdown', () => {
  let wrapper;
  const onChange = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyDropdown
            name="Test"
            options={options}
            onChange={onChange}
        />
    );
  });

  it('should set the name provided as a prop', () => {
    expect(wrapper.find('select[name="Test"]')).toHaveLength(1);
  });

  it('should render 2 options', () => {
    expect(wrapper.find('select>option')).toHaveLength(2);
    expect(wrapper.find('select>option').get(0).props.value).toEqual(1);
    expect(wrapper.find('select>option').get(0).props.children).toEqual("Test One");
  });

  it('should call the onChange fn when a value is changed', () => {
    wrapper.find('select').simulate('change', {target: {value: 2}});
    expect(onChange).toBeCalled();
  });
});
