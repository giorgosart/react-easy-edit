import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyDatalist from "./EasyDatalist";
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyDatalist', () => {
  let wrapper;
  const onChange = jest.fn();
  const options = [{label: 'Test One', value: 1},
    {label: 'Test Two', value: 2}];

  beforeEach(() => {
    wrapper = shallow(
        <EasyDatalist
            options={options}
            onChange={onChange}
            value={1}
        />
    );
  });

  it('should render two radio buttons', () => {
    expect(wrapper.find('option')).toHaveLength(2);
  });

  it("should accept `datalist` as a valid type", () => {
    const saveFn = jest.fn();
    let  wrapper = shallow(
        <EasyEdit
            type="datalist"
            onSave={saveFn}
            attributes={{name: 'datalist-test'}}
        />
    );

    wrapper.simulate('click');
    expect(wrapper).toBeTruthy(); // it used to throw an error before
  });
});
