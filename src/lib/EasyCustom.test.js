import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EasyCustom from "./EasyCustom";
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyCustom', () => {
  let wrapper;
  const childInput = <input />;
  const setValueFunction = jest.fn();
  const blurFn = jest.fn();
  const saveFn = jest.fn();
  const focusFn = jest.fn();

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

  it('should trigger the onBlur fn when custom component looses focus', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onBlur={blurFn}
            editComponent={<CustomComponent />}
        />);
    wrapper.simulate('click');
    wrapper.find('input').simulate('blur');
    expect(blurFn).toBeCalled();
  });

  it('should trigger the onSave fn when custom component looses focus, if component implements onBlur and saveOnBlur is activated', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onSave={saveFn}
            onBlur={blurFn}
            saveOnBlur
            editComponent={<CustomComponent />}
        />);
    wrapper.simulate('click');
    wrapper.find('input').simulate('blur');
    expect(blurFn).toBeCalled();
  });

  it('should trigger the onFocus fn when custom component gains focus', () => {
    wrapper = mount(
        <EasyEdit
            type="text"
            onFocus={focusFn}
            editComponent={<CustomComponent />}
        />);
    wrapper.simulate('click');
    wrapper.find('input').simulate('focus');
    expect(focusFn).toBeCalled();
  });

});

class CustomComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <input onBlur={this.props.onBlur} />;
  }
}
