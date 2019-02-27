import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Editable from "./Editable";

configure({adapter: new Adapter()});

describe('Editable - Save and Cancel buttons', () => {
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
            saveButtonLabel="Save Test"
            saveButtonStyle="save-style"
            cancelButtonLabel="Cancel Test"
            cancelButtonStyle="cancel-style"
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
    expect((wrapper.state().editing)).toEqual(true);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  //-------------------------- SAVE BUTTON --------------------------
  it('should use the prop value for the "Save" button label', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"]').text()).toEqual("Save Test")
  });

  it('should use the prop value for the "Save" button style', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="save"].save-style')).toHaveLength(1);
  });

  it('should trigger the onSave fn when the "Save" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="save"]').simulate('click');
    expect(saveFn).toBeCalled();
  });

  //-------------------------- CANCEL BUTTON -------------------------
  it('should use the prop value for the "Cancel" button label', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"]').text()).toEqual("Cancel Test")
  });

  it('should use the prop value for the "Cancel" button style', () => {
    wrapper.simulate('click');
    expect(wrapper.find('button[name="cancel"].cancel-style')).toHaveLength(1);
  });

  it('should trigger the onSave fn when the "cancel" button is clicked', () => {
    wrapper.simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');
    expect(cancelFn).toBeCalled();
  });
});
