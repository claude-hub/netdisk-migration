// Modules
import React, { ReactNode } from 'react';
import { shallow } from 'enzyme';

// Components
import LabelValue from './label-value';

describe('#label-value.tsx', () => {
  const defaultLabel = 'Some label';
  const defaultValue = 'Some value';

  const createLabelValue = ({
    label = defaultLabel,
    value = defaultValue,
    className,
  }: { label?: string; value?: ReactNode; className?: string } = {}) =>
    shallow(<LabelValue label={label} value={value} className={className} />);

  test('Renders correctly', () => {
    const labelValue = createLabelValue();

    expect(labelValue.find('.label').text()).toEqual(defaultLabel);
    expect(labelValue.find('.value').text()).toEqual(defaultValue);

    expect(labelValue.find('.common').text()).toEqual(`${defaultLabel} ${defaultValue}`);
  });

  test('Renders react nodes as a `value` prop', () => {
    const linkValue = <a href="mailto: somemail@gmail.com">somemail@gmail.com</a>;
    const labelValue = createLabelValue({ value: linkValue });

    expect(labelValue.find('.value>a').matchesElement(linkValue)).toBe(true);
  });

  test('Passes `className` prop correctly', () => {
    const className = 'some-class';
    const labelValue = createLabelValue({ className });

    expect(labelValue.find('.common').hasClass(className)).toBe(true);
  });
});
