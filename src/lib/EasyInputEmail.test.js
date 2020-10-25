import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EasyEdit from "./EasyEdit";

configure({adapter: new Adapter()});

describe('EasyInput - Email type', () => {
  it("#52 should accept `email` as a valid type", () => {
    const saveFn = jest.fn();
    let  wrapper = shallow(
        <EasyEdit
            type="email"
            onSave={saveFn}
            attributes={{name: 'email-test'}}
        />
    );

    wrapper.simulate('click');
    expect(wrapper).toBeTruthy(); // it used to throw an error before
  });
});
