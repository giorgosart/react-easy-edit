import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyDropdown from "./EasyDropdown";
import Globals from './globals'

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

  it('should use the default placeholder', () => {
    expect(wrapper.find('select>option:first-child').text()).toEqual(Globals.DEFAULT_SELECT_PLACEHOLDER);
  });
  it('should use the placeholder provided', () => {
    wrapper.setProps({placeholder: "test"});
    expect(wrapper.find('select>option:first-child').text()).toEqual("test");
  });

  it('should render 2 + 1 options including the disabled default one', () => {
    expect(wrapper.find('select>option')).toHaveLength(3);
    expect(wrapper.find('select>option:not([disabled])')).toHaveLength(2);
  });

  it('should render the option label and values based on props', () => {
    expect(wrapper.find('select>option:not([disabled])').get(0).props.value).toEqual(1);
    expect(wrapper.find('select>option:not([disabled])').get(0).props.children).toEqual("Test One");
    expect(wrapper.find('select>option:not([disabled])').get(1).props.value).toEqual(2);
    expect(wrapper.find('select>option:not([disabled])').get(1).props.children).toEqual("Test Two");
  });

  it('should call the onChange fn when a value is changed', () => {
    wrapper.find('select').simulate('change', {target: {value: 2}});
    expect(onChange).toBeCalled();
  });
});
