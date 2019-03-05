import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyCheckbox from "./EasyCheckbox";

configure({adapter: new Adapter()});

describe('EasyCheckbox', () => {
  let wrapper;
  const onChange = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyCheckbox
            options={options}
            onChange={onChange}
            value={options}
        />
    );
  });

  it('should render two radio buttons', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });
});
