import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import EasyEdit, { Types } from './EasyEdit';

describe('EasyInput - Password type', () => {
  it("#53 should accept `password` as a valid type", () => {
    const saveFn = jest.fn();
    const { getByText } = render(
        <EasyEdit
            type={Types.PASSWORD}
            onSave={saveFn}
            attributes={{name: 'password-test'}}
            value="password"
        />
    );

    expect(getByText('••••••••')).toBeInTheDocument();
  });

  it("should use the correct placeholder if no value is passed in", () => {
    const saveFn = jest.fn();
    const { getByText } = render(
        <EasyEdit
            type={Types.PASSWORD}
            onSave={saveFn}
            attributes={{name: 'password-test'}}
        />
    );

    expect(getByText('Click to edit')).toBeInTheDocument();
  });
});
