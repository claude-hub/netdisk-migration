// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Input, { InputPropsI } from './input';

describe('#input.tsx', () => {
  const createInput = (props: Partial<InputPropsI> = {}) => shallow(<Input {...props} />);

  test('Passes all props correctly', () => {
    const props: Partial<InputPropsI> = {
      type: 'text',
      value: 'this is value',
      onChange: jest.fn(),
      className: 'some-class',
      required: true,
    };
    const input = createInput(props).find('input');

    expect(input.prop('type')).toEqual(props.type);
    expect(input.prop('value')).toEqual(props.value);
    expect(input.prop('onChange')).toEqual(props.onChange);
    expect(input.hasClass(props.className!)).toBe(true);
    expect(input.prop('required')).toEqual(props.required);
  });
});
