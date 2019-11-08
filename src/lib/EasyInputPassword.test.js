import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyEdit, {Types} from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyInput - Password type', () => {

  it("#53 should accept `password` as a valid type", () => {
    const saveFn = jest.fn();
    let  wrapper = shallow(
        <EasyEdit
            type={Types.PASSWORD}
            onSave={saveFn}
            attributes={{name: 'password-test'}}
            value="password"
        />
    );

    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("••••••••");
  });

  it("should use the correct placeholder if no value is passed in", () => {
    const saveFn = jest.fn();
    let  wrapper = shallow(
        <EasyEdit
            type={Types.PASSWORD}
            onSave={saveFn}
            attributes={{name: 'password-test'}}
        />
    );

    expect(wrapper.find('div.easy-edit-wrapper').text()).toEqual("Click to edit");
  });
});
