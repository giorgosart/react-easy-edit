import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyRadio from "./EasyRadio";
import EasyEdit, {Types} from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyRadio', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
        <EasyRadio
            options={
              [{label: 'Test One', value: 1},
              {label: 'Test Two', value: 2}]
            }
            onChange={jest.fn()}
            value={1}
        />
    );
  });

  it('should render two radio buttons', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  describe('EasyEdit - EasyRadio', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
          <EasyEdit
              type={Types.RADIO}
              options={
                [{label: 'Test One', value: 1},
                {label: 'Test Two', value: 2}]
              }
              onSave={jest.fn()}
              value={1}
          />
      );
    });

    it('should render the correct label based on the value provided', () => {
      expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Test One");
    });

    it('should render the value if it does not map to an option', () => {
      wrapper.setState({value: 3});
      expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("3");
    });
  });
});
