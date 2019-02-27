import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Editable from "./Editable";

configure({adapter: new Adapter()});

describe('Editable', () => {
  let wrapper;
  const saveFn = jest.fn();
  const cancelFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <Editable
            type="text"
            onSave={saveFn}
            onCancel={cancelFn}
            name="test"
        />);
  });

  // it('hover on', () => {
  //   wrapper.simulate('mouseOver');
  //   expect((wrapper.state().hover)).toEqual(true);
  //   expect(wrapper.find('div.editable-hover-on')).toHaveLength(1);
  // });
  //
  // it('hover off', () => {
  //   wrapper.simulate('mouseOver');
  //   wrapper.simulate('mouseleave');
  //   expect((wrapper.state().hover)).toEqual(false);
  //   expect(wrapper.find('.editable-hover-on')).toHaveLength(0);
  // });

  it('should show two buttons when the user clicks on the component', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should trigger the onSave fn when the "save" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="save"]').simulate('click');
    expect(saveFn).toBeCalled();
  });

  it('should trigger the onSave fn when the "cancel" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');
    expect(cancelFn).toBeCalled();
  });
});
