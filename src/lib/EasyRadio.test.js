import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyRadio from "./EasyRadio";
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyRadio', () => {
  let wrapper;
  const onChange = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyRadio
            options={options}
            onChange={onChange}
            value={1}
        />
    );
  });

  it('should render two radio buttons', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it("should render with the correct value selected", () => {
    const saveFn = jest.fn();
    const options = [
      {label: 'Test One', value: 'testone'},
      {label: 'Test Two', value: 'testtwo'},
      {label: 'Test Three', value: 'testthree'},
      {label: 'Test Four', value: 'testfour'}
    ];

    let  wrapper = mount(
        <EasyEdit
            type="select"
            options={options}
            onSave={saveFn}
            value="testone"
        />
    );

    wrapper.simulate('click');
    expect(wrapper.find('option').at(1).instance().selected).toBeTruthy(); // it used to throw an error before
  });
});
