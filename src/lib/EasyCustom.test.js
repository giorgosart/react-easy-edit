import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyCustom from "./EasyCustom";

configure({adapter: new Adapter()});

describe('EasyCustom', () => {
  let wrapper;
  const childInput = <input />;
  const setValueFunction = jest.fn();

  it('should initially set the value passed in as the state value', () => {
    wrapper = shallow(
      <EasyCustom
        value="test value"
      >
        {childInput}
      </EasyCustom>
    );
    expect(wrapper.state('value')).toEqual('test value');
  });

  it('should execute setValue method correctly', () => {
    wrapper = shallow(
      <EasyCustom
        setValue={setValueFunction}
      >
        {childInput}
      </EasyCustom>
    );
    wrapper.instance().setValue('test new value');
    expect(wrapper.state('value')).toEqual('test new value');
    expect(setValueFunction).toHaveBeenCalled();
  });
});