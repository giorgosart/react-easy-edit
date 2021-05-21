import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EasyCheckbox from "./EasyCheckbox";
import EasyEdit from "./EasyEdit";
import Globals from './globals';

configure({adapter: new Adapter()});

describe('EasyCheckbox', () => {
  let wrapper;
  const onChange = jest.fn();
  const options = [{label: 'Test One', value: '1'},
    {label: 'Test Two', value: '2'}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyCheckbox
            options={options}
            onChange={onChange}
            value={options}
        />
    );
  });

  it('should render two checkboxes', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it("should render a placeholder", () => {
    let  wrapper = shallow(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
        />
    );
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual(Globals.DEFAULT_PLACEHOLDER);
  });

  it("should render the selected label for a given value", () => {
    let  wrapper = shallow(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
            value="1"
        />
    );
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Test One");
  });

  it("should render the value of the checkbox even if it's not part ", () => {
    const val = "I am not part of the options list";
    let  wrapper = shallow(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
            value={val}
        />
    );
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual(val);
  });

  it("should render all selected values as a comma separated list", () => {
    let  wrapper = shallow(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
            value="1,2"
        />
    );
    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Test One, Test Two");
  });

  it("uncheck all options", () => {
    wrapper = mount(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
            value={["1","2"]}
        />);
    wrapper.simulate('click');
    wrapper.find('input[type="checkbox"]').at(0).simulate('change', {currentTarget: {checked: false}});
    wrapper.find('input[type="checkbox"]').at(1).simulate('change', {currentTarget: {checked: false}});
    expect(wrapper.state('tempValue')).toEqual([]);
  });

  it("should remove (on onSave) any values that are not part of the option list", () => {
    wrapper = mount(
        <EasyEdit
            type="checkbox"
            options={options}
            onSave={jest.fn()}
            value={["1", "3", "4"]}
        />);
    wrapper.simulate('click');
    wrapper.find('input[type="checkbox"]').at(0).simulate('change', {currentTarget: {checked: false}});
    wrapper.find('button[name="save"]').simulate('click');
    expect(wrapper.state('value')).toEqual([]);
  });
});
